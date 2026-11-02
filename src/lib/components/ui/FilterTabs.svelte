<script lang="ts">
	import { scrollFade } from '#lib/actions/scrollFade.js';
	let { options, value = $bindable('all'), label }: {
		options: { value: string; label: string }[]; value?: string; label: string;
	} = $props();
</script>

<div use:scrollFade class="mb-8 flex flex-wrap gap-3" role="group" aria-label={label}>
	{#each options as option}
		<button type="button" aria-pressed={value === option.value} onclick={() => value = option.value}
			class="min-h-11 cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-(--duration-fast) {value === option.value ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-secondary hover:border-secondary hover:text-foreground'}">{option.label}</button>
	{/each}
</div>
