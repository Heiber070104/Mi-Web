import { m } from '#lib/paraglide/messages.js';
import type { PortfolioProject, ProjectFilterOption } from '#lib/types/portfolio.js';

// Fictional examples. Shared metadata is independent of the selected language.
export const projects: PortfolioProject[] = [
	{
		id: '01',
		category: 'web',
		technologies: ['Svelte', 'TypeScript'],
		image: '/images/projects/inventory.png',
		getContent: () => ({ title: m.inventory_title(), description: m.inventory_copy(), imageAlt: m.inventory_alt() })
	},
	{
		id: '02',
		category: 'mobile',
		technologies: ['PWA', 'CSS'],
		image: '/images/projects/tasks.png',
		getContent: () => ({ title: m.tasks_title(), description: m.tasks_copy(), imageAlt: m.tasks_alt() })
	},
	{
		id: '03',
		category: 'web',
		technologies: ['Svelte', 'Charts'],
		image: '/images/projects/analytics.png',
		getContent: () => ({ title: m.analytics_title(), description: m.analytics_copy(), imageAlt: m.analytics_alt() })
	}
];

export const technologyGroups = [
	{ getTitle: () => m.tech_interfaces(), items: ['Svelte', 'SvelteKit', 'HTML'] },
	{ getTitle: () => m.tech_logic(), items: ['TypeScript', 'JavaScript', 'Git'] },
	{ getTitle: () => m.tech_styles(), items: ['Tailwind CSS', 'CSS', 'Figma'] }
];

export const sampleContact = { email: 'alex@example.com', profile: '@alex-demo' };

export const projectFilters: ProjectFilterOption[] = [
	{ value: 'all', getLabel: () => m.all() },
	{ value: 'web', getLabel: () => m.web() },
	{ value: 'mobile', getLabel: () => m.mobile() }
];
