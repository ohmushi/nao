<script lang="ts">
	import { loadStripe, type CreatePaymentMethodSepaDebitData, type PaymentMethod, type PaymentMethodResult, type Stripe, type StripeIbanElement } from "@stripe/stripe-js";
	import { onMount } from "svelte";
    import "$lib/utils/string.utils";

    export const ssr = false;

    const public_api_key = `${import.meta.env.VITE_STRIPE_PUBLIC_API_KEY}`;
    let stripe: Stripe | null = null;
    let iban_element: StripeIbanElement | null;
    let form: HTMLFormElement;
    let new_beneficiary = $state({
        name: '',
        email: '',
        iban_complete: false,
        payment_method_id: '',
    });
    let form_disabled = $derived(String.nullOrBlank(new_beneficiary.name) 
                                || String.nullOrBlank(new_beneficiary.email) 
                                || !new_beneficiary.iban_complete)

    onMount(() => {
        mount_stripe_form();
    })


	async function mount_stripe_form() {
		stripe = await loadStripe(public_api_key);
        if(!stripe) return;

        const elements = stripe.elements();
        iban_element = elements?.create('iban', {
            supportedCountries: ['SEPA'],
            placeholderCountry: 'FR',
        })

        iban_element?.mount('#iban')
        iban_element.on('change', (iban_object) => {
            new_beneficiary.iban_complete = iban_object.complete;
        })
	}

    

    async function create_payment_method(e: Event) {
        e.preventDefault();
        const paymentMethodResult = await stripe?.createPaymentMethod({
            type: 'sepa_debit',
            sepa_debit: iban_element!,
            billing_details: {
                name: new_beneficiary.name,
                email: new_beneficiary.email,
            },
        } satisfies CreatePaymentMethodSepaDebitData);

        if(!paymentMethodResult?.paymentMethod) {
            console.error('Unable to create payment method.');
            return;
        }

        new_beneficiary.payment_method_id = paymentMethodResult.paymentMethod.id;
    }
</script>
<form bind:this={form} method="POST" onsubmit={(e) => create_payment_method(e).then(() => form.submit())}>
    <label>
        <span>🧑 Nom du bénéficiaire</span>
        <input bind:value={new_beneficiary.name} name="name"
        type="text" required placeholder="papa, maman, un pote, une asso ...">
    </label>
    <label>
        <span>@ Email du bénéficiaire</span>
        <input bind:value={new_beneficiary.email} name="email"
        type="email" required placeholder="beneficiaire@exemple.fr">
    </label>
    <label>
        <span>🏦 IBAN</span>
        <input type="hidden" name="payment_method_id" value={new_beneficiary.payment_method_id}>
        <div id="iban">
            <!-- will insert the iban form here -->
        </div>
    </label>
    <button 
        disabled={form_disabled}
        >Ajouter</button>
</form>

<style>
    form {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }


    label {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        span {
            font-size: medium;
            margin-left: 1rem;
        }
    }

    input, #iban {
        padding: 0.7rem 1rem;
        background-color: var(--grey-light-warm);
        border: none;
        border-radius: 0.5rem;
        font-size: medium;
        min-height: 1rem;
    }

    button {
        color: white;
        background-color: var(--main-color);
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-size: large;
    }:disabled {
        background-color: var(--main-color-light);
    }
</style>