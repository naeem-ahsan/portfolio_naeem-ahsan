<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { ChapterId, NavigationItem } from '../../data/types';

const props = defineProps<{ chapters: NavigationItem[] }>();
const announcement = ref('');
let abortController: AbortController | undefined;
let mediaQuery: MediaQueryList | undefined;

const chapterIds = new Set(props.chapters.map((chapter) => chapter.id));

function chapterFromHash(): ChapterId | null {
  const value = window.location.hash.slice(1).split('/')[0];
  return chapterIds.has(value as ChapterId) ? (value as ChapterId) : null;
}

onMounted(() => {
  const deck = document.querySelector<HTMLElement>('#portfolio-deck');
  if (!deck) return;

  abortController = new AbortController();
  const { signal } = abortController;
  mediaQuery = window.matchMedia('(min-width: 64rem)');
  const panels = Array.from(deck.querySelectorAll<HTMLElement>('[data-chapter]'));
  const tabs = Array.from(deck.querySelectorAll<HTMLButtonElement>('[data-chapter-tab]'));

  const setPanelState = (activeId: ChapterId) => {
    deck.dataset.activeChapter = activeId;
    panels.forEach((panel) => {
      const active = panel.dataset.chapter === activeId;
      panel.dataset.active = String(active);
      const content = panel.querySelector<HTMLElement>('[data-chapter-content]');
      const tab = panel.querySelector<HTMLButtonElement>('[data-chapter-tab]');
      tab?.setAttribute('aria-expanded', String(active));
      if (tab) tab.tabIndex = active ? -1 : 0;
      if (mediaQuery?.matches && content) {
        content.inert = !active;
        content.setAttribute('aria-hidden', String(!active));
      } else if (content) {
        content.inert = false;
        content.removeAttribute('aria-hidden');
      }
    });
  };

  const activate = (id: ChapterId, options: { history?: 'push' | 'replace' | 'none'; focus?: boolean } = {}) => {
    setPanelState(id);
    const chapter = props.chapters.find((item) => item.id === id);
    announcement.value = chapter ? `${chapter.label} chapter opened` : '';

    if (options.history === 'push') history.pushState({ chapter: id }, '', `#${id}`);
    if (options.history === 'replace') history.replaceState({ chapter: id }, '', `#${id}`);

    if (options.focus && mediaQuery?.matches) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#heading-${id}`)?.focus());
    }
  };

  const applyMode = () => {
    if (mediaQuery?.matches) {
      deck.dataset.enhanced = 'true';
      activate(chapterFromHash() ?? (deck.dataset.activeChapter as ChapterId) ?? 'introduction');
    } else {
      delete deck.dataset.enhanced;
      panels.forEach((panel) => {
        const content = panel.querySelector<HTMLElement>('[data-chapter-content]');
        if (content) {
          content.inert = false;
          content.removeAttribute('aria-hidden');
        }
      });
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.chapterTab as ChapterId;
      activate(id, { history: 'push', focus: true });
    }, { signal });

    tab.addEventListener('keydown', (event) => {
      let nextIndex: number | null = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      const target = tabs[nextIndex];
      const id = target?.dataset.chapterTab as ChapterId | undefined;
      if (id) activate(id, { history: 'push', focus: true });
    }, { signal });
  });

  document.querySelectorAll<HTMLElement>('[data-chapter-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!mediaQuery?.matches) return;
      const id = link.dataset.chapterLink as ChapterId;
      if (!chapterIds.has(id)) return;
      event.preventDefault();
      activate(id, { history: 'push', focus: true });
    }, { signal });
  });

  window.addEventListener('popstate', () => {
    const id = chapterFromHash();
    if (id) activate(id, { history: 'none', focus: false });
  }, { signal });
  window.addEventListener('hashchange', () => {
    const id = chapterFromHash();
    if (id) activate(id, { history: 'none', focus: false });
  }, { signal });
  mediaQuery.addEventListener('change', applyMode, { signal });

  const initial = chapterFromHash() ?? 'introduction';
  setPanelState(initial);
  applyMode();
});

onUnmounted(() => abortController?.abort());
</script>

<template>
  <p class="sr-only" aria-live="polite">{{ announcement }}</p>
</template>
