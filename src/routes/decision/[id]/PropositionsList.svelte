<script lang="ts">
	import NoDecisions from "../../NoDecisions.svelte";
	import type { Choice } from "../../types";
	import ChooseCtaCard from "./ChooseCTACard.svelte";
	import PropositionCard from "./PropositionCard.svelte";

    let {propositions = $bindable()} = $props();

    let selected: Choice[] = $derived(propositions.filter((p: Choice)  => p.selected));
    let choose_CTA_disabled: boolean = $derived(selected.length === 0);

    function remove_empty_propositions() {
        propositions = propositions.filter((p: Choice) => p.value.trim().length > 0);
    }
</script>

<form method="POST" action="?/choose">
    <h2>Propositions</h2>
    <ul>
        <li><ChooseCtaCard disabled={choose_CTA_disabled}></ChooseCtaCard></li>
        {#each propositions as proposition}
            <li>
                <PropositionCard
                    bind:value={proposition.value}
                    bind:selected={proposition.selected}
                    empty_proposition={remove_empty_propositions}
                ></PropositionCard>
            </li>
        {:else}
            <NoDecisions></NoDecisions> <!-- TODO faire un autre composant NoPropositions -->
        {/each}
    </ul>
</form>

<style>
    form {
        padding: 0 var(--16px);
        height: 80%;
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