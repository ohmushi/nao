import { elasticIn } from "svelte/easing";


type EventHandler = (event: Event, ...args: Array<unknown>) => void;

export function preventDefault(fn: EventHandler): EventHandler {
    return (event: Event, ...args: Array<unknown>) => {
        event.preventDefault();
        fn(event, ...args);
    }
}

export const nosubmit = preventDefault;

export function if_target_is(target: unknown)
: {then: (fn: EventHandler) => EventHandler}
{
    return {
        then: (fn: EventHandler) => {
            return (event: Event, ...args: Array<unknown>) => {
                if(target === event.target) fn(event, ...args);
            }
        }
    }
}