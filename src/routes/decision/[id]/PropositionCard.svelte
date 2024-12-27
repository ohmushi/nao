<script lang="ts">
	import Card from "./Card.svelte";
	import Checkbox from "./Checkbox.svelte";

    let {
        value = '',
        selected = $bindable(false),
        cancel_adding_proposition,
    } = $props();

    let is_new = $derived(value.trim() === '');
    let input: HTMLInputElement = $state()!;

    $effect(() => {
        if(is_new) input.focus();
    })

    function onfocusout() {
        if(value.trim() === '') cancel_adding_proposition();
        // TODO else propsition_updated(proposition) 
    }

</script>

<Card>
    <label class="checkbox_hitbox">
        <Checkbox bind:checked={selected}></Checkbox>
    </label>
    
    <input bind:this={input} bind:value {onfocusout}/>
</Card>

<style>
    :global(.card) {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
    }

    .checkbox_hitbox {
        padding: 1rem;
    }

    input {
        border: none;
        background-color: transparent;
        font-size: 1rem;
        padding: 1rem;
        text-overflow: ellipsis;
        
    }:focus {
        outline: none;
    }
</style>