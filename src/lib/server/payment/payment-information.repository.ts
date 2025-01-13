import { default_payment_information, type PaymentInformation } from "$lib/types";
import fs from 'node:fs'

export interface UserRepository {
    savePaymentInformationId(id: string): void;
}

export class JsonUserRespository implements UserRepository {
    constructor(
        private readonly json_path: string,
    ) {}

    private get_payment_from_json_file(): PaymentInformation {
        let info: PaymentInformation;
        try {
            info = JSON.parse(fs.readFileSync(this.json_path).toString());
        } catch(e) {
            fs.writeFileSync(this.json_path, JSON.stringify([default_payment_information()]));
            info = JSON.parse(fs.readFileSync(this.json_path).toString());
        }
        return info;
    }

    private write_payment_information(information: PaymentInformation): void {
            fs.writeFileSync(this.json_path, JSON.stringify(information));
        }

    savePaymentInformationId(id: string): void {
        let payment_information = this.get_payment_from_json_file();
        payment_information.payment_information_id = id;
        this.write_payment_information(payment_information);
    }
} 