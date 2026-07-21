<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const announcement = ref('');
let abortController: AbortController | undefined;

onMounted(() => {
  const archive = document.querySelector<HTMLElement>('#project-archive');
  if (!archive) return;

  abortController = new AbortController();
  const { signal } = abortController;
  const filterGroup = archive.querySelector<HTMLElement>('[data-project-filters]');
  const filterButtons = Array.from(archive.querySelectorAll<HTMLButtonElement>('[data-project-filter]'));
  const rows = Array.from(archive.querySelectorAll<HTMLElement>('[data-project-row]'));
  const emptyState = archive.querySelector<HTMLElement>('[data-project-empty]');
  const preview = archive.querySelector<HTMLElement>('[data-project-preview]');
  const previewImage = archive.querySelector<HTMLImageElement>('[data-project-preview-image]');
  const previewCaption = archive.querySelector<HTMLElement>('[data-project-preview-caption]');
  const studies = Array.from(archive.querySelectorAll<HTMLElement>('[data-case-study]'));
  const openLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-project-open]'));
  let returnFocus: HTMLElement | null = null;
  let activeStudy: HTMLElement | null = null;
  let returnHash = '#work';
  const previousInert = new Map<HTMLElement, boolean>();

  archive.dataset.projectEnhanced = 'true';
  if (filterGroup) filterGroup.hidden = false;
  if (preview) preview.hidden = false;
  studies.forEach((study) => {
    study.querySelectorAll<HTMLButtonElement>('[data-project-close]').forEach((button) => { button.hidden = false; });
  });

  const setPreview = (row: HTMLElement) => {
    const source = row.dataset.cover;
    const title = row.dataset.title;
    if (previewImage && source && title) {
      previewImage.src = source;
      previewImage.alt = `Preview placeholder for ${title}`;
    }
    if (previewCaption && title) previewCaption.textContent = title;
  };

  rows.forEach((row) => {
    row.addEventListener('pointerenter', () => setPreview(row), { signal });
    row.addEventListener('focusin', () => setPreview(row), { signal });
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.projectFilter ?? 'All';
      let visibleCount = 0;
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      rows.forEach((row) => {
        const visible = category === 'All' || row.dataset.category === category;
        row.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount !== 0;
      const firstVisible = rows.find((row) => !row.hidden);
      if (firstVisible) setPreview(firstVisible);
      announcement.value = `${visibleCount} project${visibleCount === 1 ? '' : 's'} shown for ${category}`;
    }, { signal });
  });

  const slugFromHash = () => {
    const [chapter, slug] = window.location.hash.slice(1).split('/');
    return chapter === 'work' && slug ? slug : null;
  };

  const getStudy = (slug: string) => studies.find((study) => study.dataset.caseStudy === slug) ?? null;

  const modalBackground = () => [
    ...Array.from(document.querySelectorAll<HTMLElement>('.chapter-panel:not(#work)')),
    document.querySelector<HTMLElement>('#work > .chapter-tab'),
    document.querySelector<HTMLElement>('#work .section-heading'),
    archive.querySelector<HTMLElement>('[data-project-filters]'),
    archive.querySelector<HTMLElement>('.project-browser'),
    document.querySelector<HTMLElement>('.mobile-header'),
    document.querySelector<HTMLElement>('.desktop-footer'),
    document.querySelector<HTMLElement>('.index-rail'),
  ].filter((item): item is HTMLElement => Boolean(item));

  const setBackgroundInert = (inert: boolean) => {
    if (inert) {
      previousInert.clear();
      modalBackground().forEach((element) => {
        previousInert.set(element, element.inert);
        element.inert = true;
      });
      return;
    }
    previousInert.forEach((value, element) => { element.inert = value; });
    previousInert.clear();
  };

  const focusableElements = (study: HTMLElement) => Array.from(study.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )).filter((element) => !element.hasAttribute('hidden'));

  const hideStudy = (restoreFocus = true) => {
    if (!activeStudy) return;
    delete activeStudy.dataset.open;
    activeStudy.removeAttribute('role');
    activeStudy.removeAttribute('aria-modal');
    activeStudy.removeAttribute('tabindex');
    activeStudy = null;
    delete archive.dataset.caseStudyOpen;
    document.body.classList.remove('is-scroll-locked');
    setBackgroundInert(false);
    if (restoreFocus && returnFocus?.isConnected) requestAnimationFrame(() => returnFocus?.focus());
  };

  const openStudy = (slug: string, options: { push?: boolean; trigger?: HTMLElement | null } = {}) => {
    const study = getStudy(slug);
    if (!study) return;
    if (activeStudy && activeStudy !== study) hideStudy(false);
    if (activeStudy === study) return;
    returnFocus = options.trigger ?? document.activeElement as HTMLElement | null;
    returnHash = window.location.hash.startsWith('#work/') ? '#work' : (window.location.hash || '#work');
    activeStudy = study;
    archive.dataset.caseStudyOpen = slug;
    study.dataset.open = 'true';
    study.setAttribute('role', 'dialog');
    study.setAttribute('aria-modal', 'true');
    study.setAttribute('tabindex', '-1');
    document.body.classList.add('is-scroll-locked');
    setBackgroundInert(true);
    if (options.push) history.pushState({ overlay: 'project', slug, returnHash }, '', `#work/${slug}`);
    const closeButton = study.querySelector<HTMLButtonElement>('[data-project-close]');
    requestAnimationFrame(() => (closeButton ?? study).focus());
  };

  const closeStudy = () => {
    if (history.state?.overlay === 'project') {
      history.back();
      return;
    }
    hideStudy(false);
    history.replaceState({ chapter: 'work' }, '', '#work');
    document.querySelector<HTMLElement>('#work')?.scrollIntoView();
    requestAnimationFrame(() => document.querySelector<HTMLElement>('#heading-work')?.focus());
  };

  openLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const slug = link.dataset.projectOpen;
      if (!slug || !getStudy(slug)) return;
      event.preventDefault();
      openStudy(slug, { push: true, trigger: link });
    }, { signal });
  });

  studies.forEach((study) => {
    study.querySelectorAll<HTMLButtonElement>('[data-project-close]').forEach((button) => {
      button.addEventListener('click', closeStudy, { signal });
    });
    study.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeStudy();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = focusableElements(study);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) {
        event.preventDefault();
        study.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }, { signal });
  });

  const syncFromHistory = () => {
    const slug = slugFromHash();
    if (slug && getStudy(slug)) openStudy(slug, { push: false });
    else hideStudy(true);
  };
  window.addEventListener('popstate', syncFromHistory, { signal });
  window.addEventListener('hashchange', syncFromHistory, { signal });

  const initialSlug = slugFromHash();
  if (initialSlug) openStudy(initialSlug, { push: false });
});

onUnmounted(() => abortController?.abort());
</script>

<template><p class="sr-only" aria-live="polite">{{ announcement }}</p></template>

<style>
.project-archive[data-project-enhanced="true"] .case-study-list {
  display: contents;
}

.project-archive[data-project-enhanced="true"] .project-case-study {
  display: none;
}

.project-archive[data-project-enhanced="true"] .project-case-study[data-open="true"] {
  position: fixed;
  inset: 0;
  z-index: 110;
  display: block;
  overflow-y: auto;
  border: 0;
  background: var(--color-paper-light);
}
</style>
