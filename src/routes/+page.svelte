<script lang="ts">
    import type { PageData } from './$types';
    import Logo from './Logo.svelte';
	import DecisionCard from "./DecisionCard.svelte";
    import NoDecisions from "./NoDecisions.svelte";
	import AddCta from './AddCTA.svelte';
    import { page } from '$app/state'; 

    let { data }: { data: PageData } = $props();
    let decisions = $state(data.decisions);

    console.log(page.url.href);
    
</script>

<header class="logo_nao">
    <Logo></Logo>
    <a href="/beneficiaries/new">👨‍🍳 add beneficiary</a>
</header>
<ul>
    {#each decisions as decision}
    <li>
        <DecisionCard {decision}></DecisionCard>
    </li>
    {:else}
        <NoDecisions></NoDecisions>
    {/each}
</ul>

<AddCta href="decision/new">Ajouter une décision</AddCta>


<style>
    ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 var(--16px);
    }

    a:hover {
        text-decoration: underline;
    }
</style>