import type { Action } from 'svelte/action';

const nodes = new Set<HTMLElement>();
let frame: number | undefined;
let resizeObserver: ResizeObserver | undefined;

function refresh() {
	frame = undefined;
	const revealLine = window.innerHeight * 0.82;
	// Read all geometry before writing state, to avoid repeated layout work.
	const states = [...nodes].map((node) => {
		// The reveal animation must not affect its own activation position.
		const translate = getComputedStyle(node).translate.split(/\s+/);
		const offsetY = Number.parseFloat(translate[1] ?? '0') || 0;
		const top = node.getBoundingClientRect().top - offsetY;
		return { node, state: top < revealLine ? 'visible' : 'hidden' };
	});
	for (const { node, state } of states) {
		if (node.dataset.scrollFade !== state) node.dataset.scrollFade = state;
	}
}

function scheduleRefresh() {
	if (frame === undefined) frame = requestAnimationFrame(refresh);
}

/** Reveal from below and resync after jumps, even when visibility stays at 0%. */
export const scrollFade: Action<HTMLElement> = (node) => {
	if (nodes.size === 0) {
		window.addEventListener('scroll', scheduleRefresh, { passive: true });
		window.addEventListener('resize', scheduleRefresh);
		window.addEventListener('hashchange', scheduleRefresh);
		window.addEventListener('pageshow', scheduleRefresh);
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(scheduleRefresh);
			resizeObserver.observe(document.body);
		}
	}
	nodes.add(node);
	resizeObserver?.observe(node);
	scheduleRefresh();
	return {
		destroy() {
			nodes.delete(node);
			resizeObserver?.unobserve(node);
			delete node.dataset.scrollFade;
			if (nodes.size === 0) {
				window.removeEventListener('scroll', scheduleRefresh);
				window.removeEventListener('resize', scheduleRefresh);
				window.removeEventListener('hashchange', scheduleRefresh);
				window.removeEventListener('pageshow', scheduleRefresh);
				resizeObserver?.disconnect();
				resizeObserver = undefined;
				if (frame !== undefined) cancelAnimationFrame(frame);
				frame = undefined;
			}
		}
	};
};
