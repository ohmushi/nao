import { env } from '$env/dynamic/private';

import { type DecisionsRepository } from "./decisions/decisions.repository";
import { JsonDecisionsRepository } from "./decisions/json.decisions.repository";
import type { Payment } from "./payment/payment";
import { StripePayment } from "./payment/stripe.payment";
import { type BeneficiariesRepository } from "./beneficiaries/beneficiaries.repository";
import { JsonBeneficiariesRepository } from "./beneficiaries/json.beneficiaries.repository";
import type { PaymentInformationRepository } from "./payment/payment-information.repository";
import { JsonPaymentInformationRespository } from "./payment/json.payment-information.repository";

const db_dir = `${env.DB_DIR}`;
const stripe_secret_api_key = `${env.STRIPE_SECRET_API_KEY}`;

export const Beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository(db_dir + '/beneficiaries.db.json');
export const Decisions: DecisionsRepository = new JsonDecisionsRepository(db_dir + '/decisions.db.json');
export const Payments: Payment = new StripePayment(Beneficiaries, stripe_secret_api_key);
export const PaymentInformation: PaymentInformationRepository = new JsonPaymentInformationRespository(db_dir + '/payment_information.db.json'); 