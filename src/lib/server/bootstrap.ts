import { JsonBeneficiariesRepository, type BeneficiariesRepository } from "./beneficiaries";
import { JsonDecisionsRepository, type DecisionsRepository } from "./decisions";
import { env } from '$env/dynamic/private';
import type { Payment } from "./payment/payment";
import { StripePayment } from "./payment/stripe.payment";

export const beneficiaries: BeneficiariesRepository = new JsonBeneficiariesRepository('src/lib/server/beneficiaries.json');
export const decisions: DecisionsRepository = new JsonDecisionsRepository('src/lib/server/decisions.json');
export const payment: Payment = new StripePayment(env.STRIPE_PUBLIC_API_KEY, env.STRIPE_SECRET_API_KEY);