<script lang="ts">
	import { m } from '#lib/paraglide/messages.js';
	import Button from '#lib/components/ui/Button.svelte';
	import Badge from '#lib/components/ui/Badge.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import FilterTabs from '#lib/components/ui/FilterTabs.svelte';
	import ProjectCard from '#lib/components/ui/ProjectCard.svelte';
	import SiteHeader from '#lib/components/layout/SiteHeader.svelte';
	import { projects, projectFilters } from '#lib/data/portfolio.js';
	import AboutSection from '#lib/components/sections/AboutSection.svelte';
	import TechnologiesSection from '#lib/components/sections/TechnologiesSection.svelte';
	import ContactSection from '#lib/components/sections/ContactSection.svelte';
	let filter = $state('all');
	const visibleProjects = $derived(projects.filter(project => filter === 'all' || project.category === filter));
</script>

<svelte:head>
	<title>{m.page_title()}</title>
	<meta name="description" content={m.page_description()} />
</svelte:head>

<div id="top">
	<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:p-4 focus:text-on-primary">{m.skip_content()}</a>
	<SiteHeader brand="Alex / Demo" menuLabel={m.menu()} languageLabel={m.language_label()} links={[{ href: '#top', label: m.home() }, { href: '#about', label: m.about_nav() }, { href: '#projects', label: m.projects() }, { href: '#technologies', label: m.tech_nav() }, { href: '#contact', label: m.contact() }]} />
	<main id="main-content" tabindex="-1">
		<section class="mx-auto grid min-h-[calc(100svh-var(--header-height))] max-w-content gap-12 px-gutter py-section md:grid-cols-[1.3fr_1fr] md:items-center">
			<div>
				<Badge>{m.demo()}</Badge>
				<h1 class="mt-8 text-display leading-[1.08] font-extrabold tracking-tight">{m.hero()}<br /><span class="text-primary">{m.accent()}</span></h1>
				<p class="mt-6 max-w-lg text-muted">{m.intro_copy()}</p>
				<div class="mt-8 flex flex-wrap gap-4">
					<Button onclick={() => document.getElementById('projects')?.scrollIntoView()}>{m.explore()} <span aria-hidden="true">↓</span></Button>
					<Button variant="secondary" onclick={() => document.getElementById('about')?.scrollIntoView()}>{m.about_nav()}</Button>
				</div>
			</div>
			<img src="/images/developer.png" alt={m.hero_alt()} width="1024" height="1024" fetchpriority="high" class="mx-auto aspect-square w-full max-w-96 rounded-xl object-contain md:max-w-none" />
		</section>
		<AboutSection />
		<section id="projects" aria-labelledby="projects-heading" class="border-y border-border bg-surface/40 py-section">
			<div class="mx-auto max-w-content px-gutter">
				<SectionHeading id="projects-heading" title={m.recent()} accent={m.projects()} description={m.projects_copy()} />
				<FilterTabs label={m.filter()} bind:value={filter} options={projectFilters.map(option => ({ value: option.value, label: option.getLabel() }))} />
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
					{#each visibleProjects as project (project.id)}
						{@const content = project.getContent()}
						<ProjectCard title={content.title} description={content.description} technologies={project.technologies} image={project.image} imageAlt={content.imageAlt} href={project.href} placeholderLabel={m.preview()} actionLabel={m.view()} note={m.project_note()} />
					{/each}
				</div>
			</div>
		</section>
		<TechnologiesSection />
		<ContactSection />
	</main>
	<footer class="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6 px-gutter py-8 text-sm text-muted">
		<div><p class="font-mono text-lg text-secondary">Alex / Demo<span class="text-primary">.</span></p><p class="mt-2">{m.footer_copy()}</p><p class="mt-2 text-xs">{m.demo()}</p></div>
		<a href="#top" class="inline-flex min-h-11 items-center gap-3 text-secondary hover:text-primary">{m.back_top()} <span aria-hidden="true">↑</span></a>
	</footer>
</div>
