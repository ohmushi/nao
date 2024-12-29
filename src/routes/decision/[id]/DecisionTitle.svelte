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
        margin-top: 0;
        span {
            font-size: 3rem;
        }

        figcaption {
            font-size: 1.3rem;
            font-weight: bold;
        }
    }
</style>