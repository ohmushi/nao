import { defaultBeneficiary, type Beneficiary } from "$lib/types";
import fs from 'node:fs';
import { beneficiaries } from "./bootstrap";

export interface BeneficiariesRepository {
    getBeneficiaries(): Beneficiary[]
	getBeneficiaryById(id: string): Beneficiary | null;
}

export class JsonBeneficiariesRepository implements BeneficiariesRepository {

    constructor(
        private readonly json_path: string = 'src/lib/server/beneficiaries.json',
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

    getBeneficiaries(): Beneficiary[] {
        return this.get_beneficiaries_from_json_file();
    }

    getBeneficiaryById(id: string): Beneficiary | null {
        return this.get_beneficiaries_from_json_file()
                    .find(b => b.id === id) 
                    ?? null;
    }
}