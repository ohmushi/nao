<script lang="ts">
	import type { Action } from "svelte/action";
	import { emptyDecision } from "../types";

    let decision = $state(emptyDecision());

    const add_currency: Action = () => {
        $effect(() => {
            const currency = decision.transaction.how_much.currency;
            document.documentElement.style.setProperty('--currency', `"${currency}"`);
        })
    }
</script>

<svelte:document use:add_currency></svelte:document>

<header>
    <a href="/">Annuler</a>
    <h1>Nouvelle décision</h1>
</header>
<form>
    <label>
        <span>🤔 Décision</span>
        <input bind:value={decision.name}
        name="name" required placeholder="p. ex. destination prochaines vacances"/>
    </label>
    <fieldset>
        <label>
            <span>⏰ Quand ?</span>
            <input bind:value={
                () => decision.transaction.when.toISOString().substring(0,10),
                (v: string) => decision.transaction.when = new Date(v)
            }
            type="date" required name="when">
        </label>
    
        <label id="how_much">
            <span>💳 Combien ?</span>
            <input
            type="number" required inputmode="numeric" name="how_much" min="1" step="1">
        </label>
    
        <label>
            <span>🧑 Qui ?</span>
            <select name="who">
                <option value="0">Nao</option>
                <option value="1">Jeremy</option>
                <option value="2">Fabio</option>
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