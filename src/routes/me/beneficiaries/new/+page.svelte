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

    let new_beneficiary = {
        id: '',
        name: '',
        iban: '',
    }
</script>
<form method="POST">
    <label>
        <span>🧑 Nom du bénéficiaire</span>
        <input bind:value={new_beneficiary.name}
        type="text" placeholder="papa, maman, un pote, ...">
    </label>
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>
        <span>🏦 IBAN</span>
        <div id="iban">
            <!-- will insert the iban form here -->
        </div>
    </label>
    <button>Ajouter</button>
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
    }

    button {
        color: white;
        background-color: var(--main-color);
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-size: large;
    }
</style>