<script lang="ts">
	import type { PageData } from './$types';
    import { emptyChoice } from '$lib/types';
	import TransactionInfo from './TransactionInfo.svelte';
	import PropositionsList from './PropositionsList.svelte';
	import BackToDecisions from './BackToDecisions.svelte';
	import DecisionTitle from './DecisionTitle.svelte';
	import AddCta from '../../AddCTA.svelte';

	let { data }: { data: PageData } = $props();
    let {icon, name, choices, transaction} = data.decision;
    let propositions = $state(choices);

	function onClickAddProposition() {
		propositions = [emptyChoice(), ...propositions];
	}
</script>

<BackToDecisions></BackToDecisions>

<DecisionTitle {icon} {name}></DecisionTitle>
<TransactionInfo {...transaction}></TransactionInfo>
<PropositionsList bind:propositions></PropositionsList>
<AddCta onclick={onClickAddProposition}>Ajouter une proposition</AddCta>
