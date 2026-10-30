<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, locales, localizeHref } from '#lib/paraglide/runtime.js';
	let { brand, links, menuLabel, languageLabel }: {
		brand: string; links: { href: string; label: string }[]; menuLabel: string; languageLabel: string;
	} = $props();
	let open = $state(false);
</script>

<header class="border-b border-border bg-background">
	<div class="mx-auto flex max-w-content flex-wrap items-center justify-between gap-5 px-gutter py-6">
		<a href="#top" class="font-mono text-lg font-bold tracking-tight">{brand}<span class="text-primary">.</span></a>
		<button type="button" class="min-h-11 rounded-md border border-border px-4 text-secondary md:hidden" aria-expanded={open} aria-controls="site-navigation" onclick={() => open = !open}>{menuLabel}<span aria-hidden="true"> {open ? '−' : '+'}</span></button>
		<div id="site-navigation" class="w-full flex-col gap-6 md:flex md:w-auto md:flex-row md:items-center {open ? 'flex' : 'hidden'}">
			<nav aria-label={menuLabel} class="flex flex-col gap-2 md:flex-row md:gap-7">
				{#each links as link}<a href={link.href} onclick={() => open = false} class="flex min-h-11 items-center text-sm text-secondary hover:text-primary">{link.label}</a>{/each}
			</nav>
			<nav aria-label={languageLabel} class="flex gap-3 border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
				{#each locales as locale}
					<a href={localizeHref(page.url.pathname + (typeof window !== 'undefined' ? page.url.search + page.url.hash : ''), { locale })} lang={locale} hreflang={locale} aria-current={getLocale() === locale ? 'true' : undefined} data-sveltekit-reload class="flex min-h-11 items-center text-xs {getLocale() === locale ? 'font-bold text-primary' : 'text-secondary hover:text-primary'}">{locale === 'es' ? 'Español' : 'English'}</a>
				{/each}
			</nav>
		</div>
	</div>
</header>
