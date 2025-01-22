export class PaymentInformation {
    payment_information_id: string = '';
    events: PaymentInformationEvent[] = [];
    decisions: Map<string, { payment_intent: string }> = new Map();

    with_event(e: PaymentInformationEvent): PaymentInformation {
        this.events.push(e);
        return e.play(this);
    }

    static register_payment_information(payment_information_id: string): PaymentInformation {
        const info = new PaymentInformation();
        return info.with_event(new PaymentInformationRegisteredEvent(payment_information_id));
    }
}

export abstract class PaymentInformationEvent {
    name = this.constructor.name;
    abstract play(information: PaymentInformation): PaymentInformation;
}

export class PaymentInformationRegisteredEvent extends PaymentInformationEvent {
    constructor(readonly payment_information_id: string) {
        super();
    }

    play(information: PaymentInformation): PaymentInformation {
        information.payment_information_id = this.payment_information_id;
        return information;
    }
}

export class PaymentIntentForDecisionRegisteredEvent extends PaymentInformationEvent {
    constructor(
        readonly payment_intent_id: string,
        readonly decision_id: string,
    ) {
        super();
    }
    play(information: PaymentInformation): PaymentInformation {        
        information.decisions.set(
            this.decision_id,
            { payment_intent: this.payment_intent_id }
        )
        return information;
    }
}


export function default_payment_information(): PaymentInformation {
    return new PaymentInformation();
}