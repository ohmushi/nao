<script lang="ts">
	import NoDecisions from "../../NoDecisions.svelte";
	import type { Choice } from "../../types";
	import ChooseCtaCard from "./ChooseCTACard.svelte";
	import PropositionCard from "./PropositionCard.svelte";

    let {propositions = $bindable()} = $props();

    let selected: Choice[] = $derived(propositions.filter((p: Choice)  => p.selected));
    let choose_CTA_disabled: boolean = $derived(selected.length === 0);

    function cancel_adding_proposition() {
        propositions.shift();
    }
</script>

<form method="POST" action="?/choose">
    <h2>Propositions</h2>
    <ul>
        <li><ChooseCtaCard disabled={choose_CTA_disabled}></ChooseCtaCard></li>
        {#each propositions as proposition}
            <li>
                <PropositionCard
                    value={proposition.value}
                    bind:selected={proposition.selected}
                    {cancel_adding_proposition}
                ></PropositionCard>
            </li>
        {:else}
            <NoDecisions></NoDecisions> <!-- TODO faire un autre composant NoPropositions -->
        {/each}
    </ul>
</form>

<style>
    form {
        padding: var(--16px);
    }
    h2 {
        font-weight: normal;
        color: var(--main-color-light);
        font-size: var(--16px);
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
</style>