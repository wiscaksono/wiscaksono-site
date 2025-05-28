import { generateEntries } from '$lib';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return generateEntries('projects');
};
