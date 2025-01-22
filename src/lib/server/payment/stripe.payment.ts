import {Stripe} from 'stripe';
import type { Payment } from './payment';
import '$lib/utils/string.utils'
import type { BeneficiariesRepository } from '../beneficiaries/beneficiaries.repository';
import type { Transaction } from '$lib/types';
import type { PaymentMethod } from '@stripe/stripe-js';

type stripe_money = {
    amount: number;
    currency: string;
}

export class StripePayment implements Payment {
    readonly stripe: Stripe;

    constructor(
        private Beneficiaries: BeneficiariesRepository,
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
            return_url: redirect_url, // http://url/?session_id={CHECKOUT_SESSION_ID}
        });
        if(String.nullOrBlank(session.client_secret))
            throw new Error('Something went wrong with the creation of the Checkout Session.');
        
        return session.client_secret ?? '';
    }

    /**
     * @param session_id Client secret 'cs_...'
     * @returns SetupIntent Id
     */
    async retrieveUserStoredPaymentInformationIdFromSession(session_id: string): Promise<string> {
        const session = await this.stripe.checkout.sessions.retrieve(session_id);
        return session.setup_intent?.toString() ?? '';
    }

    async retrieveUserIdFromSession(session_id: string): Promise<String> {
        const session = await this.stripe.checkout.sessions.retrieve(session_id);
        return session?.customer?.toString() ?? '';
    }

    /**
     * 
     * @param payment_information_id SetupIntent Id where the money is from
     * @param transaction_information information about the payment (amount, currency, etc)
     */
    async initiate_new_payment(payment_information_id: string, transaction_information: Transaction): Promise<string> {
        const setup_intent = await this.stripe.setupIntents.retrieve(payment_information_id);
        if(!setup_intent?.payment_method) throw new Error('Unable to retrieve SetupIntent.');
        
        const money = this.to_stripe_money(
            transaction_information.how_much.amount, 
            transaction_information.how_much.currency
        );
        const intent = await this.stripe.paymentIntents.create({
            amount: money.amount,
            currency: money.currency,
            payment_method: setup_intent.payment_method?.toString(),
            customer: setup_intent.customer?.toString() ?? '',
        });
        
        return intent.id;
    }


    private to_stripe_money(amount: number, nao_currency: string): stripe_money {
        return {
            amount: amount * 100, // https://docs.stripe.com/currencies#minor-units
            currency: this.to_stripe_currency(nao_currency),
        } satisfies stripe_money;
    }

    private to_stripe_currency(nao_currency: string): string {
        switch(nao_currency) {
            case '€': return 'eur';
            case '$': return 'usd';
            default: throw new Error(`Currency ${nao_currency} not handled.`);
        }
    }

    
}