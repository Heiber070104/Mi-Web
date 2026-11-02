export function activeSection(
	sections: { id: string; top: number }[],
	activationLine: number,
	atBottom: boolean
): string | undefined {
	if (atBottom) return sections.at(-1)?.id;
	return sections.findLast(section => section.top <= activationLine)?.id ?? sections[0]?.id;
}
