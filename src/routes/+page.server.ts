import { decisions } from '$lib/server/bootstrap';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {	
	return {
		decisions: decisions.getAllDecisions()
	};
};