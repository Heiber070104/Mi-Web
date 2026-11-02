import test from 'node:test';
import assert from 'node:assert/strict';
import { activeSection } from '../src/lib/utils/activeSection.ts';

test('tracks the section crossing the reading line below the fixed header', () => {
	const sections = [{ id: 'top', top: -600 }, { id: 'about', top: 208 }, { id: 'projects', top: 850 }];
	assert.equal(activeSection(sections, 236, false), 'about');
	assert.equal(activeSection(sections.map(s => ({ ...s, top: s.top - 650 })), 236, false), 'projects');
	assert.equal(activeSection(sections.map(s => ({ ...s, top: s.top + 650 })), 236, false), 'top');
});

test('identifies the final section at the bottom even if it is short', () => {
	assert.equal(activeSection([{ id: 'projects', top: -800 }, { id: 'contact', top: 500 }], 236, true), 'contact');
	assert.equal(activeSection([], 236, false), undefined);
});
