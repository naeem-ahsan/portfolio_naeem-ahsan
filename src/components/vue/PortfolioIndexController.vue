<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

let abortController: AbortController | undefined;

onMounted(() => {
  const panel = document.querySelector<HTMLElement>('#portfolio-index-dialog');
  if (!panel) return;

  abortController = new AbortController();
  const { signal } = abortController;
  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-index-trigger]'));
  const closeButton = panel.querySelector<HTMLButtonElement>('[data-index-close]');
  const background = [
    document.querySelector<HTMLElement>('#main-content'),
    document.querySelector<HTMLElement>('.mobile-header'),
    document.querySelector<HTMLElement>('.desktop-footer'),
  ].filter((item): item is HTMLElement => Boolean(item));
  let returnFocus: HTMLElement | null = null;
  let returnHash = '#introduction';

  document.documentElement.dataset.indexEnhanced = 'true';
  if (closeButton) closeButton.hidden = false;

  const focusableElements = () => Array.from(panel.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )).filter((element) => !element.hasAttribute('hidden'));

  const setBackgroundInert = (inert: boolean) => {
    background.forEach((element) => {
      element.inert = inert;
      if (inert) element.setAttribute('aria-hidden', 'true');
      else element.removeAttribute('aria-hidden');
    });
  };

  const open = (options: { push?: boolean; trigger?: HTMLElement | null } = {}) => {
    if (panel.dataset.open === 'true') return;
    returnFocus = options.trigger ?? document.activeElement as HTMLElement | null;
    if (window.location.hash !== '#index') returnHash = window.location.hash || '#introduction';
    panel.dataset.open = 'true';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    document.body.classList.add('is-scroll-locked');
    setBackgroundInert(true);
    if (options.push) history.pushState({ overlay: 'index', returnHash }, '', '#index');
    requestAnimationFrame(() => closeButton?.focus());
  };

  const hide = (restoreFocus = true) => {
    if (panel.dataset.open !== 'true') return;
    delete panel.dataset.open;
    panel.removeAttribute('role');
    panel.removeAttribute('aria-modal');
    document.body.classList.remove('is-scroll-locked');
    setBackgroundInert(false);
    if (restoreFocus && returnFocus?.isConnected) requestAnimationFrame(() => returnFocus?.focus());
  };

  const close = () => {
    if (history.state?.overlay === 'index') {
      history.back();
      return;
    }
    hide();
    history.replaceState({ chapter: returnHash.slice(1) }, '', returnHash);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open({ push: true, trigger });
    }, { signal });
  });

  closeButton?.addEventListener('click', close, { signal });

  panel.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const chapter = link.dataset.chapterLink;
    if (chapter && !window.matchMedia('(min-width: 64rem)').matches) {
      event.preventDefault();
      hide(false);
      history.pushState({ chapter }, '', `#${chapter}`);
      document.querySelector<HTMLElement>(`#${chapter}`)?.scrollIntoView();
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#heading-${chapter}`)?.focus());
      return;
    }
    hide(false);
  }, { signal });

  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = focusableElements();
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, { signal });

  window.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open({ push: true, trigger: document.activeElement as HTMLElement | null });
    }
  }, { signal });

  const syncFromHistory = () => {
    if (window.location.hash === '#index') open({ push: false });
    else hide(true);
  };
  window.addEventListener('popstate', syncFromHistory, { signal });
  window.addEventListener('hashchange', syncFromHistory, { signal });

  if (window.location.hash === '#index') open({ push: false });
});

onUnmounted(() => {
  abortController?.abort();
  delete document.documentElement.dataset.indexEnhanced;
});
</script>

<template><span class="sr-only">Portfolio Index controls loaded</span></template>
