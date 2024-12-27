<script lang="ts">
    let {icon, name} = $props();
</script>

<figure>
    <span>{icon}</span>
    <figcaption>{name}</figcaption>
</figure>

<style>
        figure {
        justify-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
            font-size: 4rem;
        }

        figcaption {
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
</style>