import { defaultBeneficiary, type Beneficiary } from "$lib/types";
import fs from 'node:fs';

export interface BeneficiariesRepository {
    getBeneficiaries(): Promise<Beneficiary[]>;
	getBeneficiaryById(id: string): Promise<Beneficiary | null>;
    registerNewBeneficiary(name: string, receiving_method_id: string): Promise<string>;
}

export class JsonBeneficiariesRepository implements BeneficiariesRepository {

    constructor(
        private readonly json_path: string,
    ) {}

    private get_beneficiaries_from_json_file(): Beneficiary[] {
        let data: Beneficiary[];
        try {
            data = JSON.parse(fs.readFileSync(this.json_path).toString());
        } catch(e) {
            fs.writeFileSync(this.json_path, JSON.stringify([defaultBeneficiary()]));
            data = JSON.parse(fs.readFileSync(this.json_path).toString());
        }
        return data;
    }

    private write_beneficiaries(beneficiaries: Beneficiary[]): void {
        fs.writeFileSync(this.json_path, JSON.stringify(beneficiaries));
    }

    getBeneficiaries(): Promise<Beneficiary[]> {
        return Promise.resolve(this.get_beneficiaries_from_json_file());
    }

    getBeneficiaryById(id: string): Promise<Beneficiary | null> {
        const beneficiary = this.get_beneficiaries_from_json_file()
                    .find(b => b.id === id) 
                    ?? null;
        return Promise.resolve(beneficiary);
    }

    async registerNewBeneficiary(name: string, payment_method_id: string): Promise<string> {
        const beneficiaries = await this.getBeneficiaries();
        const id = beneficiaries.length.toString();
        beneficiaries.push({
            id: id,
            name: name,
            receiving_method_id: payment_method_id,
        } satisfies Beneficiary);

        this.write_beneficiaries(beneficiaries);

        return Promise.resolve(id);
    }
}