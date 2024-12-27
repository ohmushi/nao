import { decisionsStore } from './data';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {	
	return {
		decisions: decisionsStore
	};
};