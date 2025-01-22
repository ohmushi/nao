import type { PaymentInformation } from "./payment-information.model";

export interface PaymentInformationRepository {
	retrieve_payment_information(): Promise<PaymentInformation>;
    register_payment_information_id(id: string): Promise<void>;
    register_payment_intent_for_decision(payment_intent_id: string, decision_id: string): Promise<void>;
}