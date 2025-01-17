import fs from 'node:fs'
import { PaymentInformation } from './payment-information.model';
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
            this.write_payment_information(info);
        } catch (e) {
            throw new Error(`Could not retrive PaymentInformation from [${this.json_path}] : ${e}`)
        }
        return info;
    }

    private write_payment_information(information: PaymentInformation): void {
        fs.writeFileSync(this.json_path, JSON.stringify(information));
    }

    registerPaymentInformationId(id: string): void {
        this.write_payment_information(PaymentInformation.register_payment_information(id));
    }
}