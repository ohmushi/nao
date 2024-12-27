import { error } from '@sveltejs/kit';
import { decisionsStore } from '../../data';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params }) => {
	let decision = decisionsStore.find((decision) => decision.id === params.id);
	if(!decision) {
		error(404, `Unknown decision [${params.id}].`)
	}

	return {
		decision: decision,
	};
};