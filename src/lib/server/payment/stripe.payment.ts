import {Stripe} from 'stripe';
import type { Payment } from './payment';
import '$lib/utils/string.utils'

export class StripePayment implements Payment {
    readonly public_stripe: Stripe;
    readonly _private_stripe: Stripe;

    constructor(
        readonly public_api_key: string,
        private readonly _secret_api_key: string,
    ) {
        if(String.nullOrBlank(public_api_key) || String.nullOrBlank(_secret_api_key)) 
            throw new Error("Public or private (or both) Stripe API keys not defined.");
        this.public_stripe = new Stripe(public_api_key);
        this._private_stripe = new Stripe(_secret_api_key);
    }

    /**
     * create a Checkout Session for a new beneficiary
     */
    async saveBeneficiaryPaymentCredentials(success_url: string): Promise<string> {
        const session = await this._private_stripe.checkout.sessions.create({
            mode: 'setup',
            currency: 'eur',
            ui_mode: 'embedded',
            return_url: success_url + '?session_id={CHECKOUT_SESSION_ID}', // http://host:port/?session_id={CHECKOUT_SESSION_ID}
        });
        console.log('CLIENT SECRET', session.client_secret, '|');
        
        return session.client_secret ?? '';
    }
}