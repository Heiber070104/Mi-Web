<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<span class="inline-flex rounded-full border border-border bg-surface-raised px-3 py-1 font-mono text-xs text-secondary">{@render children()}</span>
