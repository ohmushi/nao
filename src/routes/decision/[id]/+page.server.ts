import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { decisions } from '$lib/server/bootstrap';


export const load: PageServerLoad = async ({ params }) => {
	let decision = decisions.getAllDecisions().find((decision) => decision.id === params.id);
	console.log(decision);
	
	if(!decision) {
		error(404, `Unknown decision [${params.id}].`)
	}

	return {
		decision: decision,
	};
};