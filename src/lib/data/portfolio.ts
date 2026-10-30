import { m } from '#lib/paraglide/messages.js';
import type { PortfolioProject, ProjectFilterOption } from '#lib/types/portfolio.js';

// Fictional examples. Shared metadata is independent of the selected language.
export const projects: PortfolioProject[] = [
	{
		id: '01',
		category: 'web',
		technologies: ['Svelte', 'TypeScript'],
		getContent: () => ({ title: m.project({ number: '01' }), description: m.sample() })
	},
	{
		id: '02',
		category: 'mobile',
		technologies: ['PWA', 'CSS'],
		getContent: () => ({ title: m.project({ number: '02' }), description: m.sample() })
	},
	{
		id: '03',
		category: 'web',
		technologies: ['Svelte', 'Charts'],
		getContent: () => ({ title: m.project({ number: '03' }), description: m.sample() })
	}
];

export const projectFilters: ProjectFilterOption[] = [
	{ value: 'all', getLabel: () => m.all() },
	{ value: 'web', getLabel: () => m.web() },
	{ value: 'mobile', getLabel: () => m.mobile() }
];
