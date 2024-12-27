<script lang="ts">
    import Arrow from '$lib/assets/arrowDown.svelte';
</script>

<figure>
    <h1>🪴</h1>
    <figcaption>
        <small>Il est temps de prendre une décision.</small>
        <Arrow></Arrow>
    </figcaption>
</figure>

<style>
    figure, figcaption {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-size: var(--128px);
        opacity: 0.7;
    }

    small {
        font-size: var(--16px);
        color: var(--main-color-light);
        height: fit-content;
        margin: var(--16px) 0;
        text-align: center;
    }
</style>