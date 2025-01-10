import { payment } from "$lib/server/bootstrap";
import { json, type RequestHandler } from "@sveltejs/kit";

export async function POST({ request }) {
    const redirect_url = request.url + '?session_id={CHECKOUT_SESSION_ID}';
    return json({
        session_id: await payment.createSessionToSaveUsersPaymentInformation(redirect_url)
    });
}

export const PUT: RequestHandler = async ({ url }) => {    
    const session_id = url.searchParams.get('session_id') ?? '';
    const payment_information_id = await payment.retrieveUserStoredPaymentInformationId(session_id);
    // TODO store User's SetupIntent
    return json({payment_information_id});
}