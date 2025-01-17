import { JsonBeneficiariesRepository, type BeneficiariesRepository } from "./beneficiaries";
import { JsonDecisionsRepository, type DecisionsRepository } from "./decisions";
import { env } from '$env/dynamic/private';
import type { Payment } from "./payment/payment";
import { StripePayment } from "./payment/stripe.payment";
import { JsonPaymentInformationRespository, type PaymentInformationRepository } from "./payment/payment-information.repository";

export const Beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository('src/lib/server/beneficiaries.db.json');
export const Decisions: DecisionsRepository = new JsonDecisionsRepository('src/lib/server/decisions.db.json');
export const Payments: Payment = new StripePayment(Beneficiaries, env.STRIPE_SECRET_API_KEY);
export const PaymentInformation: PaymentInformationRepository = new JsonPaymentInformationRespository('src/lib/server/payment/payment_information.db.json'); 