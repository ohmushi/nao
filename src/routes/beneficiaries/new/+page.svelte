<script lang="ts">
	import type { PageData } from "./$types";
    import { loadStripe } from '@stripe/stripe-js'

    let { data }: { data: PageData } = $props();
    let client_secret = data.session_id;
    let public_api_key = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;
    (async () => {
        const stripe = await loadStripe(public_api_key);
        const checkout = await stripe?.initEmbeddedCheckout({fetchClientSecret: () => Promise.resolve(client_secret)});
        checkout?.mount('#checkout');
    })();
    
</script>
<span>{data.session_id}</span>
<div id="checkout">
    <!-- Checkout will insert the payment form here -->
</div>


