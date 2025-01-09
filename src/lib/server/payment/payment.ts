export interface PaymentCredentials {

} 

export interface Payment {
    saveBeneficiaryPaymentCredentials(success_url: string): Promise<string>;
}