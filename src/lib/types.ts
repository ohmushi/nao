export type Decision = {
    id: string;
    icon: string;
    name: string;
    choices: Choice[];
    transaction: Transaction;
}

export function emptyDecision(): Decision {
    return {
        id: '?',
        icon: "",
        name: "",
        choices: [],
        transaction: {
            when: new Date(),
            how_much: {amount: 0, currency: "€"},
            who: {id: "-1", name: ""},
        },
    };
}


export type Choice = {value: string, selected: boolean};

export function emptyChoice(): Choice {
    return {
        value: '',
        selected: false,
    }
}

export type Transaction = {
    when: Date;
    how_much: Money;
    who: Beneficiary;
}

export type Money = {
    amount: number;
    currency: Currency;
}

export type Currency = '€' | '$';

export type Beneficiary = {
    id: string;
    name: string;
}

export function defaultBeneficiary(): Beneficiary {
    return {
        id: '0',
        name: 'nao',
    };
}

export type PaymentInformation = {
    payment_information_id: string,
}

export function default_payment_information(): PaymentInformation {
    return {
        payment_information_id: '',
    }
}