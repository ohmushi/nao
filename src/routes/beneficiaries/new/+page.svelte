<script lang="ts">
    import { loadStripe } from '@stripe/stripe-js'
    import { page } from "$app/state";

    let public_api_key = import.meta.env.VITE_STRIPE_PUBLIC_API_KEY;

    mount_stripe_form();
    async function mount_stripe_form() {
        const stripe = await loadStripe(public_api_key);
        const checkout = await stripe?.initEmbeddedCheckout({fetchClientSecret: fetch_client_secret()});
        checkout?.mount('#checkout');
    }

    function fetch_client_secret(): () => Promise<string> {
        return async () => {
            const res = await fetch(page.url.href, {
                method: 'POST',
                body: new FormData(),
            });
            const { data }: { data: string } = await res.json(); // form data response : {status: 200, data : ...}
            return data.substring(2, data.length - 2); // data : '["cs_..."]' because form data
        }
    }
    
</script>
<div id="checkout">
    <!-- Checkout will insert the payment form here -->
</div>


