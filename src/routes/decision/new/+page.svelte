<script lang="ts">
	import type { PageData } from "../$types";
	import { defaultBeneficiary, emptyDecision, type Beneficiary } from "$lib/types";
	import DecisionDetails from "../DecisionDetails.svelte";

	let { data }: { data: PageData } = $props();

    const tomorrow = new Date().addDays(1);

    function defaultNewDecision() {
        let decision = emptyDecision();
        decision.transaction.when = tomorrow;
        decision.transaction.how_much.amount = 1;
        decision.transaction.who = defaultBeneficiary();
        return decision;
    }

	let decision = $state(defaultNewDecision());
</script>

<DecisionDetails 
{decision}
beneficiaries={data.beneficiaries}
mode='NEW'
></DecisionDetails>