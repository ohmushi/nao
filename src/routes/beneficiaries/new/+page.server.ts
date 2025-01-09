import { payment } from "$lib/server/bootstrap";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async () => { 
    const session_id = await payment.createSessionToSaveUsersPaymentInformation(
        'http://localhost:5173/beneficiaries/new?session_id={CHECKOUT_SESSION_ID}'
    ) ?? '';
	return {
		session_id: session_id,
	};
};