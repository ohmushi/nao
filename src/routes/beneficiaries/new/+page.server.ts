import { payment } from "$lib/server/bootstrap";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async () => { 
    const client_secret = await payment.saveBeneficiaryPaymentCredentials(
        'http://localhost:5173/beneficiaries/new?session_id={CHECKOUT_SESSION_ID}'
    ) ?? '';
	return {
		client_secret: client_secret,
        public_api_key: import.meta.env.VITE_STRIPE_PUBLIC_API_KEY,
	};
};