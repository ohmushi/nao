import { Beneficiaries } from "$lib/server/bootstrap";
import type { Beneficiary } from "$lib/types";
import type { Actions } from "@sveltejs/kit";


export const actions = {
    default: async ({ request }): Promise<Beneficiary | null> => {
        const form = await request.formData();
        const name = form.get('name')?.toString() ?? '';
        const payment_method_id = form.get('payment_method_id')?.toString() ?? '';

        const id = await Beneficiaries.registerNewBeneficiary(name, payment_method_id);

        return await Beneficiaries.getBeneficiaryById(id);
    },
} satisfies Actions;