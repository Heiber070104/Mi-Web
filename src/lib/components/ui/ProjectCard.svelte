<script lang="ts">
	import Badge from './Badge.svelte';
	import { scrollFade } from '#lib/actions/scrollFade.js';
	let { title, description, technologies, image, imageAlt = '', href, actionLabel, placeholderLabel, note }: {
		title: string; description: string; technologies: string[]; image?: string; imageAlt?: string;
		href?: string; actionLabel: string; placeholderLabel: string; note?: string;
	} = $props();
</script>

<article use:scrollFade class="project-card flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card">
	<div class="aspect-video overflow-hidden bg-surface-raised">
		{#if image}
			<img src={image} alt={imageAlt} loading="lazy" class="h-full w-full object-cover" />
		{:else}
			<div class="flex h-full items-center justify-center gap-4 text-muted"><span aria-hidden="true" class="font-mono text-4xl text-primary">&lt;/&gt;</span><span class="text-sm">{placeholderLabel}</span></div>
		{/if}
	</div>
	<div class="flex flex-1 flex-col p-5 sm:p-6">
		<h3 class="text-xl font-bold">{title}</h3>
		<p class="mt-3 text-sm text-muted">{description}</p>
		<ul class="mt-5 flex flex-wrap gap-2">
			{#each technologies as technology}<li><Badge>{technology}</Badge></li>{/each}
		</ul>
		{#if note}<p class="mt-auto pt-6 text-xs text-muted">{note}</p>{/if}
		{#if href}<a class="mt-6 inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline" {href}>{actionLabel}<span aria-hidden="true"> ↗</span></a>{/if}
	</div>
</article>

<style>
	.project-card { transition: opacity var(--duration-reveal) var(--ease-reveal), translate var(--duration-reveal) var(--ease-reveal), border-color var(--duration-normal), transform var(--duration-normal); }
	.project-card:hover, .project-card:focus-within { border-color: var(--color-primary); }
	@media (prefers-reduced-motion: no-preference) { .project-card:hover { transform: translateY(-4px); } }
</style>
