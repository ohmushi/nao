import { DB_DIR, STRIPE_SECRET_API_KEY } from '$env/static/private';

import { type DecisionsRepository } from "./decisions/decisions.repository";
import { JsonDecisionsRepository } from "./decisions/json.decisions.repository";
import type { Payment } from "./payment/payment";
import { StripePayment } from "./payment/stripe.payment";
import { type BeneficiariesRepository } from "./beneficiaries/beneficiaries.repository";
import { JsonBeneficiariesRepository } from "./beneficiaries/json.beneficiaries.repository";
import type { PaymentInformationRepository } from "./payment/payment-information.repository";
import { JsonPaymentInformationRespository } from "./payment/json.payment-information.repository";

export const Beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository(DB_DIR + '/beneficiaries.db.json');
export const Decisions: DecisionsRepository = new JsonDecisionsRepository(DB_DIR + '/decisions.db.json');
export const Payments: Payment = new StripePayment(Beneficiaries, STRIPE_SECRET_API_KEY);
export const PaymentInformation: PaymentInformationRepository = new JsonPaymentInformationRespository(DB_DIR + '/payment_information.db.json'); 