type Decision = {
    id: string;
    icon: string;
    name: string;
    choices: Choice[];
    transaction: Transaction;
}

function emptyDecision(): Decision {
    return {
        id: '?',
        icon: "",
        name: "",
        choices: [],
        transaction: {
            when: new Date(),
            how_much: {
                amount: 0,
                currency: "€"
            },
            who: ""
        }
    }
}


type Choice = {value: string, selected: boolean};

function emptyChoice(): Choice {
    return {
        value: '',
        selected: false,
    }
}

type Transaction = {
    when: Date;
    how_much: Money;
    who: string;
}

type Money = {
    amount: number;
    currency: '€';
}

export type {Decision, Choice}
export {emptyDecision, emptyChoice}