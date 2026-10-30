export type ProjectCategory = 'web' | 'mobile';
export type ProjectFilter = 'all' | ProjectCategory;

export interface ProjectContent {
	title: string;
	description: string;
	imageAlt?: string;
}

export interface PortfolioProject {
	id: string;
	category: ProjectCategory;
	technologies: string[];
	image?: string;
	href?: string;
	/** Resolve messages during rendering, within the active locale context. */
	getContent: () => ProjectContent;
}

export interface ProjectFilterOption {
	value: ProjectFilter;
	getLabel: () => string;
}
