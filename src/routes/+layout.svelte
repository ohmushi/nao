<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
    
    @font-face {
        font-family: "Inter";
        src: url('$lib/fonts/Inter.ttf');
    }
    
    @font-face {
        font-family: "Iowan";
        src: url('$lib/fonts/iowan-old-style.ttf');
    }
    
    :root {
        --16px: 1rem;
        --32px: 2rem;
        --64px: 4rem;
        --128px: 8rem;
        
        --main-color: #4E96BD;
        --main-color-light: #8F9CA4;
        --main-color-dark: #3F7999;
        --grey-light-warm: #F2EEEB;

        --secondary-color: #F5945C;
        --secondary-color-light: #E7CAC2;
        --secondary-color-dark: #742835;
        --secondary-color-hover: #e08048;

        --tertiary-color: #CDDA4C;
        --tertiary-color-hover: #b2bc41;

        --max-width: 30rem;
        
    }
    
    :global(html) {
        font-family: "Inter", sans-serif;
        display: flex;
        flex-direction: column;
        align-content: stretch;
    }
    
    :global(html, body) {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    
    :global(body > div) {
        height: 100%;
    }
    
    :global(body) {
        max-width: var(--max-width);
        align-self: center;
        width: 100%;
    }

    :global(dialog) {
        max-width: var(--max-width);
    }
    
    :global(ul) {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    :global(h1) {
        margin: 0;
    }
    
    :global(button) {
        border: none;
        cursor: pointer;
    }

    :global(button:disabled) {
        cursor: default;
    }
    
    :global(a) {
        text-decoration: none;
    }
    
    :global(.logo_nao) {
        padding: var(--32px) var(--16px);
    }
    
</style>

