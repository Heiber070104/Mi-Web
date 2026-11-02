import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollFade } from '../src/lib/actions/scrollFade.ts';

test('resyncs fade after anchor jumps and ignores its own animated offset', () => {
	const listeners = new Map();
	const frames = new Map();
	let nextFrame = 0;
	const globals = {
		window: {
			innerHeight: 1000,
			addEventListener: (name, callback) => listeners.set(name, callback),
			removeEventListener: (name) => listeners.delete(name)
		},
		document: { body: {} },
		ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
		requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame; },
		cancelAnimationFrame: (id) => frames.delete(id),
		getComputedStyle: () => ({ translate: `0px ${offset}px` })
	};
	const original = new Map(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
	let top = 1300;
	let offset = 0;
	const node = { dataset: {}, getBoundingClientRect: () => ({ top: top + offset }) };
	const flush = () => {
		const pending = [...frames.values()];
		frames.clear();
		pending.forEach(callback => callback());
	};
	let action;
	try {
		Object.assign(globalThis, globals);
		action = scrollFade(node);
		flush();
		assert.equal(node.dataset.scrollFade, 'hidden');

		top = 400;
		listeners.get('scroll')(); flush();
		assert.equal(node.dataset.scrollFade, 'visible');

		// Projects are above the viewport at Contact, then jump below it at About.
		top = -1000;
		listeners.get('scroll')(); flush();
		assert.equal(node.dataset.scrollFade, 'visible');
		top = 1200;
		listeners.get('hashchange')(); listeners.get('scroll')(); flush();
		assert.equal(node.dataset.scrollFade, 'hidden');

		// A 64 px reveal offset must not keep content hidden at the reveal line.
		top = 800; offset = 64;
		listeners.get('scroll')(); flush();
		assert.equal(node.dataset.scrollFade, 'visible');
		offset = 0;
		listeners.get('resize')(); flush();
		assert.equal(node.dataset.scrollFade, 'visible');
	} finally {
		action?.destroy();
		for (const [key, descriptor] of original) {
			if (descriptor) Object.defineProperty(globalThis, key, descriptor);
			else delete globalThis[key];
		}
	}
	assert.equal(listeners.size, 0);
	assert.equal(frames.size, 0);
});
