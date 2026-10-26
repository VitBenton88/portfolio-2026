import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useActiveSection } from './useActiveSection';
import type { SectionId } from '../types';

const SECTION_IDS = ['about', 'resume', 'contact'] as const satisfies readonly SectionId[];

/** Appends a div#id to the document and stubs its getBoundingClientRect. */
function mountSection(id: SectionId, top: number, height: number) {
  const el = document.createElement('div');
  el.id = id;
  el.getBoundingClientRect = () =>
    ({
      top,
      bottom: top + height,
      height,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: top,
      toJSON() {},
    }) as DOMRect;
  document.body.appendChild(el);
  return el;
}

/** Fires a scroll event and waits for the hook's rAF-throttled update. */
async function fireScroll() {
  await act(async () => {
    window.dispatchEvent(new Event('scroll'));
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
}

describe('useActiveSection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('activates a section much taller than the viewport once its top has scrolled past the activation line', async () => {
    // 'about' has scrolled well past the top of the viewport; 'resume' has
    // just crossed the activation line but is far taller than the viewport
    // (its bottom is nowhere near visible yet); 'contact' hasn't appeared.
    mountSection('about', -1200, 700);
    mountSection('resume', 50, 2200);
    mountSection('contact', 5000, 400);

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 6000,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', { value: 1200, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true });

    const { result, unmount } = renderHook(() => useActiveSection(SECTION_IDS));

    await fireScroll();

    expect(result.current).toBe('resume');

    unmount();
  });

  it('forces the last section active once the page is scrolled to the bottom', async () => {
    // A short trailing section whose top may never reach the activation
    // line simply because there's no more page left to scroll.
    mountSection('about', -2000, 700);
    mountSection('resume', -1200, 2200);
    mountSection('contact', 400, 150);

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 3000,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', { value: 2100, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 900, configurable: true });

    const { result, unmount } = renderHook(() => useActiveSection(SECTION_IDS));

    await fireScroll();

    expect(result.current).toBe('contact');

    unmount();
  });
});
