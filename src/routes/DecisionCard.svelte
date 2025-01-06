<script lang="ts">
    import Arrow from '$lib/assets/arrow_decision_card.svelte';
    import { emptyDecision } from "$lib/types";

    let {
        decision = emptyDecision()
        } = $props();
</script>

<a href="decision/{decision.id}">
    <article>
        <span>{decision.icon}</span>
        <h2>{decision.name}</h2>
        <Arrow></Arrow>
    </article>
</a>

<style>
    article {
        display: grid;
        grid-template-columns: auto repeat(2, 1fr);
        align-items: center;

        padding: 0.5rem 1rem;
        background-color: var(--grey-light-warm);
        border-radius: 0.5rem;
    }
    span {
        font-size: var(--64px);
    }
    h2 {
        font-size: var(--16px);
        font-weight: normal;
        margin-left: 1rem;
        color: black;
    }

    :global(article > svg) {
        justify-self: end;
    }

</style>