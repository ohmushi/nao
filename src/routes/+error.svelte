<script lang="ts">
    import Logo from "./Logo.svelte";
    
    let {error: Error} = $props();
</script>

<header class="logo_nao">
    <Logo></Logo>
</header>

<main>
    <figure>
        <h1>🏮</h1>
        <figcaption>
            <small>Une erreur est survenue...</small>
        </figcaption>
        
    </figure>
    
    <a data-sveltekit-reload href="/">Réessayer</a>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
    }
    figure, figcaption {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-size: var(--128px);
        opacity: 1;
    }

    small {
        font-size: var(--16px);
        color: var(--main-color-light);
        height: fit-content;
        margin: var(--16px) 0;
    }

    a {
        background-color: var(--main-color-light);
        width: fit-content;
        padding: 1rem 2rem;
        align-self: center;
        border-radius: 0.5rem;
        color: white;
    }
</style>