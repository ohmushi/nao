import { type BeneficiariesRepository } from "./beneficiaries/beneficiaries.repository";
import { JsonDecisionsRepository, type DecisionsRepository } from "./decisions";
import { env } from '$env/dynamic/private';
import type { Payment } from "./payment/payment";
import { StripePayment } from "./payment/stripe.payment";
import { JsonPaymentInformationRespository, type PaymentInformationRepository } from "./payment/payment-information.repository";
import { JsonBeneficiariesRepository } from "./beneficiaries/json.beneficiaries.repository";

export const Beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository('src/lib/server/beneficiaries/beneficiaries.db.json');
export const Decisions: DecisionsRepository = new JsonDecisionsRepository('src/lib/server/decisions.db.json');
export const Payments: Payment = new StripePayment(Beneficiaries, env.STRIPE_SECRET_API_KEY);
export const PaymentInformation: PaymentInformationRepository = new JsonPaymentInformationRespository('src/lib/server/payment/payment_information.db.json'); 