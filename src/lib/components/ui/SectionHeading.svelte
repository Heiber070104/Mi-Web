<script lang="ts">
	import { scrollFade } from '#lib/actions/scrollFade.js';
	let { title, accent, description, id }: { title: string; accent: string; description?: string; id?: string } = $props();
</script>

<div use:scrollFade class="mb-8 max-w-2xl">
	<h2 {id} class="text-3xl font-bold tracking-tight sm:text-4xl">{title} <span class="text-primary">{accent}</span></h2>
	{#if description}<p class="mt-4 text-muted">{description}</p>{/if}
</div>
