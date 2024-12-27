<script lang="ts">
    import Plus from '$lib/assets/plus.svelte';

    let {children, ...props} = $props();
    let disabled = false;
</script>

<div class="cta">
    <button disabled={disabled} {...props}>
        <Plus></Plus>
    </button>
    <span class:disabled>{@render children?.()}</span>
</div>

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
        bottom: 4rem;
        left: 50%;
        transform: translate(-50%, 0);

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