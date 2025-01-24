import { env } from '$env/dynamic/private';

import { type DecisionsRepository } from "./decisions/decisions.repository";
import { JsonDecisionsRepository } from "./decisions/json.decisions.repository";
import type { Payment } from "./payment/payment";
import { StripePayment } from "./payment/stripe.payment";
import { type BeneficiariesRepository } from "./beneficiaries/beneficiaries.repository";
import { JsonBeneficiariesRepository } from "./beneficiaries/json.beneficiaries.repository";
import type { PaymentInformationRepository } from "./payment/payment-information.repository";
import { JsonPaymentInformationRespository } from "./payment/json.payment-information.repository";

export const Beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository(env.DB_DIR + '/beneficiaries.db.json');
export const Decisions: DecisionsRepository = new JsonDecisionsRepository(env.DB_DIR + '/decisions.db.json');
console.log('lenght of STRIPE_SECRET_API_KEY', env.STRIPE_SECRET_API_KEY.length);

export const Payments: Payment = new StripePayment(Beneficiaries, env.STRIPE_SECRET_API_KEY);
export const PaymentInformation: PaymentInformationRepository = new JsonPaymentInformationRespository(env.DB_DIR + '/payment_information.db.json'); 