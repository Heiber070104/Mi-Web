<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import Button from '#lib/components/ui/Button.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import FilterTabs from '#lib/components/ui/FilterTabs.svelte';
	import ProjectCard from '#lib/components/ui/ProjectCard.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import { projects, projectFilters } from '#lib/data/portfolio.js';
	let filter = $state('all');
	const visibleProjects = $derived(projects.filter(project => filter === 'all' || project.category === filter));
</script>

<svelte:head>
	<title>{m.page_title()}</title>
	<meta name="description" content={m.page_description()} />
</svelte:head>

<div id="top">
	<SiteHeader brand="Portfolio" menuLabel={m.menu()} languageLabel={m.language_label()} links={[{ href: '#top', label: m.home() }, { href: '#projects', label: m.projects() }, { href: '#contact', label: m.contact() }]} />
	<main>
		<section class="mx-auto grid max-w-content gap-12 px-gutter py-section md:grid-cols-[1.3fr_1fr] md:items-center">
			<div>
				<Badge>{m.demo()}</Badge>
				<h1 class="mt-8 text-display leading-[1.08] font-extrabold tracking-tight">{m.hero()}<br /><span class="text-primary">{m.accent()}</span></h1>
				<p class="mt-6 max-w-lg text-muted">{m.introduction()}</p>
				<div class="mt-8 flex flex-wrap gap-4">
					<Button onclick={() => document.getElementById('projects')?.scrollIntoView()}>{m.explore()} <span aria-hidden="true">↓</span></Button>
					<Button variant="secondary" disabled>{m.soon()}</Button>
				</div>
			</div>
			<div aria-hidden="true" class="flex aspect-square items-center justify-center rounded-xl border border-border bg-surface font-mono text-7xl text-primary shadow-glow">&lt;/&gt;</div>
		</section>
		<section id="projects" aria-labelledby="projects-heading" class="border-y border-border bg-surface/40 py-section">
			<div class="mx-auto max-w-content px-gutter">
				<SectionHeading id="projects-heading" title={m.recent()} accent={m.projects()} description={m.demo()} />
				<FilterTabs label={m.filter()} bind:value={filter} options={projectFilters.map(option => ({ value: option.value, label: option.getLabel() }))} />
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
					{#each visibleProjects as project (project.id)}
						{@const content = project.getContent()}
						<ProjectCard title={content.title} description={content.description} technologies={project.technologies} image={project.image} imageAlt={content.imageAlt} href={project.href} placeholderLabel={m.preview()} actionLabel={m.view()} />
					{/each}
				</div>
			</div>
		</section>
		<section id="contact" class="mx-auto flex max-w-content flex-wrap items-center justify-between gap-8 px-gutter py-section">
			<SectionHeading title={m.contact()} accent={m.soon()} description={m.demo()} />
			<Button variant="secondary" onclick={() => document.getElementById('top')?.scrollIntoView()}>{m.back()} <span aria-hidden="true">↑</span></Button>
		</section>
	</main>
	<footer class="border-t border-border px-gutter py-8 text-center text-sm text-muted">{m.demo()}</footer>
</div>
