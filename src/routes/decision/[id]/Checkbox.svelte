<script lang="ts">
    let {checked = $bindable(false)} = $props();
</script>

<input type="checkbox" bind:checked/>
<span class="checkmark" ></span>

<style>
    input {
        position: absolute;
        appearance: none;
    }

    .checkmark {
        display: block;
        height: 1.3rem;
        width: 1.3rem;
        background-color: white;
        border-radius: 0.2rem;
        position: relative;
    }

    input:checked ~ .checkmark {
        background-color: var(--main-color);
    }

    input:checked ~ .checkmark:after {
        display: block;
    }

    .checkmark:after {
        content: "";
        display: none;
        position: absolute;
        left: 38%; 
        top: 28%;
        width: 15%;
        height: 30%;
        border: solid white;
        border-width: 0 0.15rem 0.15rem 0;
        transform: rotate(45deg);
    }

</style>