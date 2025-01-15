<script lang="ts">
	import { loadStripe } from "@stripe/stripe-js";
	import { onMount } from "svelte";

    const public_api_key = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;

    onMount(() => {
        mount_stripe_form();
    })


	async function mount_stripe_form() {
		const stripe = await loadStripe(public_api_key);
        const elements = stripe?.elements();
        const iban = elements?.create('iban', {
            supportedCountries: ['SEPA'],
            placeholderCountry: 'FR',
        })

        iban?.mount('#iban')
	}
</script>
<label>
    Nom du bénéficiaire
    <input type="text">
</label>
<div id="iban">
    <!-- will insert the iban form here -->
</div>