<script lang="ts">
    import type { Money, Beneficiary } from "$lib/types";

    let {when, how_much, who} : {when: Date, how_much: Money, who: Beneficiary} = $props();
    let {amount, currency} = how_much;

    const dateFormatter = Intl.DateTimeFormat('fr', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
</script>
<section>
    <div>
        <span class="head">Quand ?</span>
        <time datetime="2024-10-24">⏰ {dateFormatter.format(when)}</time>
    </div>
    <div>
        <span class="head">Combien ?</span>
        <span>💳 {amount} {currency}</span>
    </div>
    <div>
        <span class="head">Qui ?</span>
        <span>🧑 {who.name}</span>
    </div>
</section>

<style>
    section {
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
    }

    section > div {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .head {
        font-size: 1.2vmax;
    }

    span:not(.head) {
        font-size: 2.3vmax;
        font-weight: bold;
    }

    time {
        font-size: 1.7vmax;
        font-weight: bold;
        background-color: var(--secondary-color-light);
        border-radius: 0.3rem;
        padding: 0.1rem 0.5rem;
    }

</style>