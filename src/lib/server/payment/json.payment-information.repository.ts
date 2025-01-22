import fs from 'node:fs'
import { PaymentInformation, PaymentIntentForDecisionRegisteredEvent } from './payment-information.model';
import type { PaymentInformationRepository } from './payment-information.repository';

export class JsonPaymentInformationRespository implements PaymentInformationRepository {
    constructor(
        private readonly json_path: string,
    ) { }

    // TODO generify this in json.utils
    private get_payment_from_json_file(): PaymentInformation {
        let info: PaymentInformation;
        if (!fs.existsSync(this.json_path))
            this.write_payment_information(new PaymentInformation())
        try {
            const json_str = fs.readFileSync(this.json_path).toString();
            info = Object.assign(new PaymentInformation, JSON.parse(json_str));
            info.decisions = Object.assign(new Map, info.decisions);
        } catch (e) {
            throw new Error(`Could not retrive PaymentInformation from [${this.json_path}] : ${e}`)
        }
        return info;
    }

    private write_payment_information(information: PaymentInformation): void {
        let to_write: any = information;
        to_write.decisions = Object.fromEntries(information.decisions);
        fs.writeFileSync(this.json_path, JSON.stringify(to_write));
    }

    register_payment_information_id(id: string): Promise<void> {
        this.write_payment_information(PaymentInformation.register_payment_information(id));
        return Promise.resolve();
    }

    retrieve_payment_information(): Promise<PaymentInformation> {
        return Promise.resolve(this.get_payment_from_json_file());
    }

    async register_payment_intent_for_decision(payment_intent_id: string, decision_id: string): Promise<void> {
        const info = await this.retrieve_payment_information();
        const event = new PaymentIntentForDecisionRegisteredEvent(payment_intent_id, decision_id);
        
        this.write_payment_information(info.with_event(event));
        
        return Promise.resolve();
    }
}