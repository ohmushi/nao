import type { Decision } from "$lib/types"

export const decisionsStore: Decision[] = [
    {
        id: '1', icon: "🤷", name: "Nom de l'app",
        choices: [],
        transaction: {
            when: new Date(Date.parse('2025-01-01')),
            how_much: {amount: 20, currency: '€'},
            who: 'Fabio'
        }
    },
    {
        id: '2', icon: "🎉", name: "Invités soirée",
        choices: [
            {value: 'Charles', selected: false}, 
            {value: 'Fabio', selected: true}, 
            {value: 'Manon', selected: false},
        ],
        transaction: {
            when: new Date(Date.parse('2024-10-24')),
            how_much: {amount: 20, currency: '€'},
            who: 'Jeremy'
        }
    },
 ]