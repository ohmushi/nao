<script lang="ts">
    let {children} = $props();
</script>
<article class="card">
    {@render children()}
</article>

<style>
    article {
        padding: 0;
        font-size: 1rem;
        border-radius: 0.3rem;
        user-select: none;
        background-color: var(--grey-light-warm);
        height: 3.4rem;
    }
</style>