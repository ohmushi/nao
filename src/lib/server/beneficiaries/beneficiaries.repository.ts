import { type Beneficiary } from "$lib/types";

export interface BeneficiariesRepository {
    getBeneficiaries(): Promise<Beneficiary[]>;
	getBeneficiaryById(id: string): Promise<Beneficiary | null>;
    registerNewBeneficiary(name: string, receiving_method_id: string): Promise<string>;
}