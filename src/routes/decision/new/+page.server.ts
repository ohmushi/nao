import type { Actions, PageServerLoad } from './$types';
import * as db from '$lib/server/decisions'
import { defaultBeneficiary, type Beneficiary, type Decision } from '$lib/types';
import "$lib/utils/string.utils";
import "$lib/utils/date.utils"
import { fail, redirect } from '@sveltejs/kit';
import { beneficiaries } from '$lib/server/bootstrap';

export const load: PageServerLoad = async () => {
	return {
		beneficiaries: beneficiaries.getBeneficiaries(),
	}
};

export const actions = {
	new: async ({ cookies, request }) => {
		const form = await request.formData();
		const decision = form_to_decision(form);
		
		const errors = validate_new_decision(decision);
		if(errors.length > 0) return fail(417, {errors: errors})
		
		db.saveNewDecision(decision);
		
		redirect(303, '/');
	},

} satisfies Actions;

function form_to_decision(data: FormData): Decision {
	return {
		id: '?',
		icon: '🤔',
		name: data.get('decision')?.toString() ?? '',
		choices: [],
		transaction: {
			when: new Date(data.get('when')?.toString() ?? Date.tomorrow()),
			how_much: {
				amount: parseInt(data.get('how_much')?.toString() ?? '-1'),
				currency: '€'
			},
			who: data.get('who') as (Beneficiary | null) ?? defaultBeneficiary(),
		}
	}
}
function validate_new_decision(decision: Decision) {
	let validation_errors = [];

	if(String.nullOrBlank(decision.name)) 
		validation_errors.push('Name is missing.');
	if(decision.transaction.when.toISODateString() <= Date.today().toISODateString())
		validation_errors.push('The date must be at least tomorrow.');
	if(decision.transaction.how_much.amount < 1)
		validation_errors.push('The date must be at least tomorrow.');
	
	return validation_errors;
}

