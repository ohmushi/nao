import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Decisions } from '$lib/server/bootstrap';


export const load: PageServerLoad = async ({ params }) => {
	let decision = Decisions.getAllDecisions().find((decision) => decision.id === params.id);
	
	if(!decision) {
		error(404, `Unknown decision [${params.id}].`)
	}

	return {
		decision: decision,
	};
};