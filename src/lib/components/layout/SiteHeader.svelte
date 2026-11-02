<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { activeSection } from '#lib/utils/activeSection.js';
	import { getLocale, locales, localizeHref } from '#lib/paraglide/runtime.js';
	let { brand, links, menuLabel, languageLabel }: {
		brand: string; links: { href: string; label: string }[]; menuLabel: string; languageLabel: string;
	} = $props();
	let open = $state(false);
	let activeHref = $state('#top');
	const currentUrl = $derived(page.shallow?.url ?? page.url);
	let refreshSections = () => {};
	afterNavigate(() => refreshSections());
	onMount(() => {
		let frame: number | undefined;
		let updatingUrl = false;
		let disposed = false;
		const schedule = () => {
			if (frame === undefined && !disposed) frame = requestAnimationFrame(update);
		};
		function update() {
			frame = undefined;
			// Do not replace a deep link while initial scroll restoration is in progress.
			if (document.documentElement.hasAttribute('data-restoring-scroll')) return;
			const sections = links.flatMap(link => {
				const element = document.getElementById(link.href.slice(1));
				return element ? [{ id: element.id, top: element.getBoundingClientRect().top }] : [];
			});
			const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 92;
			// The expanded mobile menu is an overlay, not a change of reading section.
			if (open && window.innerWidth < 1024) return;
			const id = activeSection(sections, headerHeight + Math.min(innerHeight * 0.2, 160),
				window.scrollY > 0 && window.scrollY + innerHeight >= document.documentElement.scrollHeight - 2);
			if (!id) return;
			activeHref = `#${id}`;
			if (updatingUrl || location.hash === activeHref) return;
			const url = new URL(location.href);
			url.hash = activeHref;
			updatingUrl = true;
			void goto(url, { shallow: true, replace: true, reset: false, state: page.state })
				.finally(() => { updatingUrl = false; schedule(); });
		}
		refreshSections = schedule;
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		window.addEventListener('hashchange', schedule);
		window.addEventListener('pageshow', schedule);
		const observer = new MutationObserver(schedule);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-restoring-scroll'] });
		const resizeObserver = new ResizeObserver(schedule);
		resizeObserver.observe(document.body);
		schedule();
		return () => {
			disposed = true;
			if (frame !== undefined) cancelAnimationFrame(frame);
			observer.disconnect();
			resizeObserver.disconnect();
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			window.removeEventListener('hashchange', schedule);
			window.removeEventListener('pageshow', schedule);
			refreshSections = () => {};
		};
	});
</script>

<div class="h-(--header-height)" aria-hidden="true"></div>
<header class="site-header fixed inset-x-0 top-0 z-40 max-h-dvh overflow-y-auto">
	<div class="mx-auto flex max-w-content flex-wrap items-center justify-between gap-5 px-gutter py-6">
		<a href="#top" class="font-mono text-lg font-bold tracking-tight">{brand}<span class="text-primary">.</span></a>
		<button type="button" class="min-h-11 rounded-md border border-border px-4 text-secondary lg:hidden" aria-expanded={open} aria-controls="site-navigation" onclick={() => { open = !open; if (!open) refreshSections(); }}>{menuLabel}<span aria-hidden="true"> {open ? '−' : '+'}</span></button>
		<div id="site-navigation" class="w-full flex-col gap-6 lg:flex lg:w-auto lg:flex-row lg:items-center {open ? 'flex' : 'hidden'}">
			<nav aria-label={menuLabel} class="flex flex-col gap-2 lg:flex-row lg:gap-7">
				{#each links as link}<a href={link.href} onclick={() => { open = false; refreshSections(); }} aria-current={activeHref === link.href ? 'location' : undefined} class="flex min-h-11 items-center text-sm hover:text-primary {activeHref === link.href ? 'font-semibold text-primary' : 'text-secondary'}">{link.label}</a>{/each}
			</nav>
			<nav aria-label={languageLabel} class="flex gap-3 border-t border-border pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
				{#each locales as locale}
					<a href={localizeHref(currentUrl.pathname + (typeof window !== 'undefined' ? currentUrl.search + currentUrl.hash : ''), { locale })} lang={locale} hreflang={locale} aria-current={getLocale() === locale ? 'true' : undefined} data-sveltekit-reload class="flex min-h-11 items-center text-xs {getLocale() === locale ? 'font-bold text-primary' : 'text-secondary hover:text-primary'}">{locale === 'es' ? 'Español' : 'English'}</a>
				{/each}
			</nav>
		</div>
	</div>
</header>

<style>
	.site-header {
		background: rgb(8 10 11 / 0.96);
		box-shadow: 0 8px 24px rgb(0 0 0 / 0.16);
	}

	.site-header::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 2px;
		pointer-events: none;
		background: linear-gradient(90deg, transparent, rgb(192 199 206 / 0.3) 30%, rgb(45 212 191 / 0.3) 60%, transparent);
		filter: blur(1px);
	}

	@supports ((backdrop-filter: blur(12px)) or (-webkit-backdrop-filter: blur(12px))) {
		.site-header {
			background: rgb(8 10 11 / 0.78);
			-webkit-backdrop-filter: blur(12px);
			backdrop-filter: blur(12px);
		}
	}
</style>
