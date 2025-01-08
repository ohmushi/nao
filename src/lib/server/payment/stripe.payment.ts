import Stripe from 'stripe';
import type { Payment } from './payment';
import '$lib/utils/string.utils'

export class StripePayment implements Payment {
    readonly stripe: Stripe;

    constructor(
        private readonly api_key: string,
    ) {
        if(String.nullOrBlank(api_key)) 
            throw new Error("Stripe API key not defined.");
        this.stripe = new Stripe(api_key);
    }

    /**
     * create a Checkout Session for a new 
     */
    saveBeneficiaryPaymentCredentials(): void {
        this.stripe.checkout.sessions.create({
            mode: 'setup',
            currency: 'eur',
            customer: '{{CUSTOMER_ID}}',
            success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        });
    }

}