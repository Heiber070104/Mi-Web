<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';

	let { children }: LayoutProps = $props();
	let revealFrame = 0;
	afterNavigate(({ type }) => {
		if (type !== 'enter' || !document.documentElement.hasAttribute('data-restoring-scroll')) return;
		// Restore after router initialization, while the initial document is still hidden.
		revealFrame = requestAnimationFrame(() => {
			const root = document.documentElement;
			const savedY = root.getAttribute('data-restore-scroll-y');
			const anchor = root.getAttribute('data-restore-anchor');
			if (savedY !== null) {
				window.scrollTo({ left: Number(root.getAttribute('data-restore-scroll-x') ?? 0), top: Number(savedY), behavior: 'instant' });
			} else if (anchor) {
				try { document.getElementById(decodeURIComponent(anchor))?.scrollIntoView({ behavior: 'instant' }); }
				catch { /* Invalid URL fragments should not prevent the page from appearing. */ }
			}
			revealFrame = requestAnimationFrame(() => {
				for (const name of ['data-restoring-scroll', 'data-restore-scroll-x', 'data-restore-scroll-y', 'data-restore-anchor']) {
					root.removeAttribute(name);
				}
			});
		});
	});
	onDestroy(() => { if (revealFrame) cancelAnimationFrame(revealFrame); });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
