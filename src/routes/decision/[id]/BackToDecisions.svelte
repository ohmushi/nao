<script lang="ts">
    import Arrow from '$lib/assets/arrow_decision_card.svelte';
</script>

<nav>
    <Arrow></Arrow>
    <a href="/">décisions</a>
</nav>

<style>
    nav {
        padding: 1rem 0 1rem 1rem;
        a {color: var(--main-color);}
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    :global(nav > svg) {
        transform: scale(-1, 1);
    }
    :global(nav > svg > path) {
        fill: var(--main-color);
    }
</style>