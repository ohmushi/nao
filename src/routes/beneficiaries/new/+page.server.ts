import { payment } from "$lib/server/bootstrap";
import type { Actions, PageServerLoad } from "./$types";

export const actions = {
	default: async ({ request }) => {
        const redirect_url = request.url + '?session_id={CHECKOUT_SESSION_ID}';
        return await payment.createSessionToSaveUsersPaymentInformation(redirect_url);
	}
} satisfies Actions;