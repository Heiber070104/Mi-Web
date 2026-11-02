<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import SectionHeading from '../ui/SectionHeading.svelte';
	import { scrollFade } from '#lib/actions/scrollFade.js';
</script>

<section id="about" aria-labelledby="about-heading" class="mx-auto grid max-w-content items-center gap-12 px-gutter py-section md:grid-cols-2">
	<div>
		<SectionHeading id="about-heading" title={m.about_title()} accent={m.about_accent()} />
		<p use:scrollFade class="text-secondary">{m.about_copy()}</p>
		<p use:scrollFade class="mt-5 text-muted">{m.about_detail()}</p>
		<p use:scrollFade class="mt-6 border-l-2 border-primary pl-4 text-sm text-muted">{m.about_note()}</p>
	</div>
	<div use:scrollFade class="rounded-xl border border-border bg-surface p-8 sm:p-12">
		<span aria-hidden="true" class="font-mono text-5xl text-primary">&#123; &#125;</span>
		<p class="mt-8 text-3xl font-bold tracking-tight">Alex <span class="text-primary">Demo.</span></p>
		<p class="mt-3 font-mono text-sm text-secondary">Frontend · UI · Web</p>
		<div aria-hidden="true" class="mt-10 space-y-3"><div class="h-2 w-3/4 rounded-full bg-primary/60"></div><div class="h-2 w-full rounded-full bg-border"></div><div class="h-2 w-1/2 rounded-full bg-secondary/40"></div></div>
	</div>
</section>
