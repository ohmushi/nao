<script lang="ts">
	import type { PageData } from "./$types";
    import { loadStripe } from '@stripe/stripe-js'

    let { data }: { data: PageData } = $props();
    $inspect(data);

    (async () => {
        const stripe = await loadStripe(data.public_api_key);
        const checkout = await stripe?.initEmbeddedCheckout({fetchClientSecret: () => Promise.resolve(data.client_secret)});
        checkout?.mount('#checkout');
    })();
    
</script>
<span>{data.client_secret}</span>
<div id="checkout">
    <!-- Checkout will insert the payment form here -->
</div>


