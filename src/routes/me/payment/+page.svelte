<script lang="ts">
    import { loadStripe } from '@stripe/stripe-js'
    import { page } from "$app/state";
	import { onMount } from 'svelte';

    let public_api_key = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;
    
    onMount(async () => {
        if(page.url.searchParams.has('session_id')) {
            store_user_payment_information(page.url.searchParams.get('session_id') ?? '')
        } else {
            mount_stripe_form();
        }
    });

    async function store_user_payment_information(checkout_session_id: string) {
        if(String.nullOrBlank(checkout_session_id)) return;
        
        // call +server.ts
        fetch(page.url.href, { method: 'PUT' });
    }

    async function mount_stripe_form() {
        const stripe = await loadStripe(public_api_key);
        const checkout = await stripe?.initEmbeddedCheckout({fetchClientSecret: fetch_client_secret()});
        checkout?.mount('#checkout');
    }

    function fetch_client_secret(): () => Promise<string> {
        return async () => {
            // call +server.ts
            const res = await fetch(page.url.href, { method: 'POST' });
            const { session_id }: { session_id: string } = await res.json();
            return session_id;
        }
    }
    
</script>
<div id="checkout">
    <!-- Checkout will insert the payment form here -->
</div>


