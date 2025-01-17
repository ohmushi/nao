import type { Actions, PageServerLoad } from './$types';
import { defaultBeneficiary, type Decision } from '$lib/types';
import "$lib/utils/string.utils";
import "$lib/utils/date.utils"
import { fail, redirect } from '@sveltejs/kit';
import { Beneficiaries, Decisions } from '$lib/server/bootstrap';

export const load: PageServerLoad = async () => {
	const b = await Beneficiaries.getBeneficiaries()
	return {
		beneficiaries: b,
	}
};

export const actions = {
	new: async ({ request }) => {
		const form = await request.formData();
		const decision = await form_to_decision(form);
		
		const errors = validate_new_decision(decision);
		if(errors.length > 0) return fail(417, {errors: errors})
		
		Decisions.saveNewDecision(decision);
		
		redirect(303, '/');
	},

} satisfies Actions;

async function form_to_decision(data: FormData): Promise<Decision> {
	return {
		id: '?',
		icon: '🤷',
		name: data.get('decision')?.toString() ?? '',
		choices: [],
		transaction: {
			when: new Date(data.get('when')?.toString() ?? Date.tomorrow()),
			how_much: {
				amount: parseInt(data.get('how_much')?.toString() ?? '0'),
				currency: '€'
			},
			who: await Beneficiaries.getBeneficiaryById(data.get('who')?.toString() ?? '0') ?? defaultBeneficiary(),
		}
	}
}

function validate_new_decision(decision: Decision) {
	let validation_errors = [];

	if(String.nullOrBlank(decision.name)) 
		validation_errors.push('Name is missing.');
	if(decision.transaction.when.toISODateString() <= Date.today().toISODateString())
		validation_errors.push('The date must be at least tomorrow.');
	if(decision.transaction.how_much.amount < 1 || decision.transaction.how_much.amount > 100)
		validation_errors.push(`The amount must be between 1 and 100${decision.transaction.how_much.currency}.`);
	if(!Beneficiaries.getBeneficiaryById(decision.transaction.who.id))
		validation_errors.push('Beneficiary doest no exists.');
	
	return validation_errors;
}
