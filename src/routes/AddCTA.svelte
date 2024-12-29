<script lang="ts">
    import Plus from '$lib/assets/plus.svelte';

    let {
        children, 
        href = null, 
        ...props
    } = $props();
    let disabled = false;
</script>

{#snippet cta()}
    <button disabled={disabled} {...props}>
        <Plus></Plus>
    </button>
    <span class:disabled>{@render children?.()}</span>
{/snippet}

{#if href !== null}
    <a class="cta" {href}>{@render cta()}</a>
{:else}
    <div class="cta">{@render cta()}</div>
{/if}

<style>
    button {
        height: 4.5rem;
        width: 4.5rem;
        border-radius: 100%;
        background-color: var(--main-color);
    }

    button:disabled {
        background-color: var(--main-color-light);
    }

    .disabled {
        color: var(--main-color-light);
    }

    .cta {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        bottom: 0;
        padding: 1rem 0 1rem 0;
        width: 100%;
        max-width: var(--max-width);
        background: linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
        span {
            color: var(--main-color-light);
            margin-top: 1rem;
        }
    }

    .cta:hover {
        button:not(:disabled) {
            background-color: var(--main-color-dark);
        }

        span:not(.disabled) {
            color: var(--main-color-dark);
        }
    }
</style>