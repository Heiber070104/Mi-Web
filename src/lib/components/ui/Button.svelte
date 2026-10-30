<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	let { variant = 'primary', children, class: className = '', ...rest }: HTMLButtonAttributes & {
		variant?: 'primary' | 'secondary'; children: Snippet;
	} = $props();
</script>

<button type="button" class="action {variant} {className}" {...rest}>{@render children()}</button>

<style>
	.action { display: inline-flex; align-items: center; justify-content: center; gap: .6rem; min-height: 2.75rem; padding: .65rem 1.6rem; border-radius: 999px; font-weight: 650; cursor: pointer; transition: background var(--duration-fast), transform var(--duration-fast); }
	.primary { background: var(--color-primary); color: var(--color-on-primary); }
	.primary:hover:not(:disabled) { background: var(--color-primary-hover); transform: translateY(-2px); }
	.secondary { background: var(--color-surface-raised); color: var(--color-secondary); border: 1px solid var(--color-border); }
	.secondary:hover:not(:disabled) { color: var(--color-secondary-hover); border-color: var(--color-secondary); }
	.action:active:not(:disabled) { transform: translateY(0); }
	.action:disabled { opacity: .45; cursor: not-allowed; }
	@media (prefers-reduced-motion: reduce) { .action:hover:not(:disabled) { transform: none; } }
</style>
