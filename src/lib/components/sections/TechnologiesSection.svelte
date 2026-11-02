<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import { technologyGroups } from '#lib/data/portfolio.js';
	import Badge from '../ui/Badge.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';
	import { scrollFade } from '#lib/actions/scrollFade.js';
</script>

<section id="technologies" aria-labelledby="technologies-heading" class="mx-auto max-w-content px-gutter py-section">
	<SectionHeading id="technologies-heading" title={m.tech_title()} accent={m.tech_accent()} description={m.tech_copy()} />
	<div class="grid gap-6 md:grid-cols-3">
		{#each technologyGroups as group, index}
			<div use:scrollFade class="rounded-xl border border-border bg-surface p-6">
				<span aria-hidden="true" class="font-mono text-sm text-primary">0{index + 1}</span>
				<h3 class="mt-5 text-xl font-semibold">{group.getTitle()}</h3>
				<ul class="mt-6 flex flex-wrap gap-2">{#each group.items as item}<li><Badge>{item}</Badge></li>{/each}</ul>
			</div>
		{/each}
	</div>
</section>
