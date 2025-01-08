<script lang="ts">
	import type { Action } from "svelte/action";
    import "$lib/utils/date.utils";
	import { defaultBeneficiary, type Beneficiary, type Decision } from "$lib/types";

    type DetailMode = 'NEW' | 'UPDATE';

    let {
        beneficiaries,
        decision, 
        mode,
    }: {
        beneficiaries: Beneficiary[],
        decision: Decision, 
        mode: DetailMode,
    } = $props();

    const add_currency: Action = () => {
        $effect(() => {
            document.documentElement.style.setProperty('--currency', `"${decision.transaction.how_much.currency}"`);
        })
    };

    function beneficiary_by_id(id: string): Beneficiary {
        return beneficiaries.find(b => b.id === id) ?? defaultBeneficiary();
    }

    $inspect(decision.transaction.who)
</script>

<svelte:document use:add_currency></svelte:document>

<header>
    <a href="/">Annuler</a>
    <h1>
        {#if mode==='NEW'}Nouvelle décision{/if}
        {#if mode==='UPDATE'}Modifier la décision{/if}
    </h1>
    
</header>
<form method="POST" action="/decision/new?/new">
    <label>
        <span>🤔 Décision</span>
        <input bind:value={decision.name}
        name="decision" required placeholder="p. ex. destination prochaines vacances"/>
    </label>
    <fieldset>
        <label>
            <span>⏰ Quand ?</span>
            <input bind:value={
                () => decision.transaction.when.toISODateString(),
                (v: string) => { if(v) decision.transaction.when = new Date(v)}
            }
            min={new Date().addDays(1).toISODateString()}
            type="date" required name="when">
        </label>
    
        <label id="how_much">
            <span>💳 Combien ?</span>
            <input bind:value={decision.transaction.how_much.amount}
            type="number" required inputmode="numeric" name="how_much" min="1" max="100" step="1">
        </label>
    
        <label>
            <span>🧑 Qui ?</span>
            <select bind:value={
                () => beneficiary_by_id(decision.transaction.who.id).id,
                (id: string) => { if(id) decision.transaction.who = beneficiary_by_id(id)}
            }
            name="who">
                {#each beneficiaries as beneficiary}
                <option value={beneficiary.id} selected={beneficiary.id === '0'}>{beneficiary.name}</option>
                {/each}
            </select>
        </label>
    </fieldset>

    <button>Ajouter la décision</button>
</form>

<style>
    header {
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 0.5rem;

        h1 {
            font-size: medium;
            font-weight: 550;
        }
    }
    
    form {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    fieldset {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        span {
            font-size: medium;
            margin-left: 1rem;
        }

        input, select {
            appearance: none;
            padding: 0.7rem 1rem;
            background-color: var(--grey-light-warm);
            border: none;
            border-radius: 0.5rem;
            font-size: medium;
        }::-webkit-date-and-time-value {
            text-align: left;
        }

        select {
            background-image: url("data:image/svg+xml;utf8,<svg opacity='0.4' fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
            background-repeat: no-repeat;
            background-position-x: 100%;
            background-position-y: 50%;
            border-right: 0.5rem solid transparent;
        }
    }

    #how_much {
        position: relative;

        input {
            padding-right: 2rem;
        }:before {
            position: absolute;
            bottom: 0;
            right: 0rem;
            padding: 0.3rem 0.7rem;
            content: var(--currency);
            font-size: x-large;
            opacity: 0.4;
        }
    }

    
    button {
        color: white;
        background-color: var(--main-color);
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-size: large;
    }
</style>