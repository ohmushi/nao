<script lang="ts">
	import Card from "./Card.svelte";

    let {disabled = true} = $props();
</script>

<Card>
    <input type="submit" {disabled} value="Choisir" />
</Card>

<style>
    :global(.card:has(> input[type="submit"])) {
        display: flex;
        overflow: hidden;
    }

    input[type="submit"] {
        color: white;
        background-color: var(--tertiary-color);
        text-align: center;
        border: none;
        font-weight: bold;
        font-size: 1rem;
        height: 100%;
        width: 100%;
    }

    input:not(:disabled):hover  {
        background-color: var(--tertiary-color-hover);
    }

    input:disabled {
        opacity: 50%;
        cursor: default;
    }
</style>