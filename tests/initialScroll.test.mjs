import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../src/app.html', import.meta.url), 'utf8');
const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function boot(type, hash = '', saved = null) {
	const attributes = new Map();
	let fallback;
	const listeners = new Map();
	runInNewContext(bootstrap, {
		performance: { getEntriesByType: () => [{ type }] },
		location: { hash, href: `https://portfolio.test/${hash}` },
		sessionStorage: { getItem: () => JSON.stringify(saved), setItem: () => {} },
		document: { documentElement: {
			setAttribute: (name, value) => attributes.set(name, value),
			removeAttribute: (name) => attributes.delete(name)
		} },
		setTimeout: (callback) => { fallback = callback; },
		window: { addEventListener: (name, callback) => listeners.set(name, callback) }
	});
	return { attributes, fallback, listeners };
}

test('normal entry at the top is never hidden', () => {
	assert.equal(boot('navigate').attributes.size, 0);
	assert.equal(boot('navigate', '#top').attributes.size, 0);
});

test('reload, history restoration and section links wait before showing content', () => {
	for (const [type, hash] of [['reload', ''], ['back_forward', ''], ['navigate', '#about']]) {
		assert.ok(boot(type, hash).attributes.has('data-restoring-scroll'));
	}
});

test('failed hydration and restored cached pages cannot stay hidden', () => {
	const failed = boot('reload', '#projects');
	failed.fallback();
	assert.equal(failed.attributes.size, 0);
	const cached = boot('back_forward');
	cached.listeners.get('pageshow')({ persisted: true });
	assert.equal(cached.attributes.size, 0);
});

test('reload restores exact saved coordinates only for the same URL', () => {
	const restored = boot('reload', '#contact', { url: 'https://portfolio.test/#contact', x: 0, y: 2400 });
	assert.equal(restored.attributes.get('data-restore-scroll-y'), '2400');
	assert.equal(restored.attributes.has('data-restore-anchor'), false);
	const fresh = boot('navigate', '#about');
	assert.equal(fresh.attributes.get('data-restore-anchor'), 'about');
	const different = boot('reload', '#about', { url: 'https://portfolio.test/#contact', x: 0, y: 2400 });
	assert.equal(different.attributes.has('data-restore-scroll-y'), false);
	assert.equal(different.attributes.get('data-restore-anchor'), 'about');
});
