import * as decisions from '$lib/server/decisions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {	
	return {
		decisions: decisions.getAllDecisions()
	};
};