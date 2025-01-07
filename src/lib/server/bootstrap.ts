import { JsonBeneficiariesRepository, type BeneficiariesRepository } from "./beneficiaries";
import { JsonDecisionsRepository, type DecisionsRepository } from "./decisions";

export const beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository('src/lib/server/beneficiaries.json');
export const decisions: DecisionsRepository = new JsonDecisionsRepository('src/lib/server/decisions.json');