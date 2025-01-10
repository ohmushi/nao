import {Stripe} from 'stripe';
import type { Payment } from './payment';
import '$lib/utils/string.utils'

export class StripePayment implements Payment {
    readonly stripe: Stripe;

    constructor(
        private readonly api_key: string, // secret api key "sk_..."
    ) {
        if(String.nullOrBlank(api_key)) 
            throw new Error("Stripe (private) API keys not defined.");
        this.stripe = new Stripe(api_key);
    }

    /**
     * Create a Checkout Session for a new beneficiary
     * @returns Client secret 'cs_...'
     */
    async createSessionToSaveUsersPaymentInformation(redirect_url: string): Promise<string> {
        const session = await this.stripe.checkout.sessions.create({
            mode: 'setup',
            currency: 'eur',
            ui_mode: 'embedded',
            return_url: redirect_url, // http://host:port/?session_id={CHECKOUT_SESSION_ID}
        });
        if(String.nullOrBlank(session.client_secret))
            throw new Error('Something went wrong with the creation of the Checkout Session.');
        
        return session.client_secret ?? '';
    }

    /**
     * @param session_id Client secret 'cs_...'
     * @returns SetupIntent Id
     */
    async retrieveUserStoredPaymentInformationId(session_id: string): Promise<string> {
        const session = await this.stripe.checkout.sessions.retrieve(session_id);
        return session.setup_intent?.toString() ?? '';
    }
}