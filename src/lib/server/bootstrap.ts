import { JsonBeneficiariesRepository, type BeneficiariesRepository } from "./beneficiaries";

export const beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository('src/lib/server/beneficiaries.json');