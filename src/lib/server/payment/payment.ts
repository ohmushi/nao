type SessionId = string;

export interface Payment {
    /**
     * User saves its payments informations in a third party service, for this, we create
     * a `session` in this service. In this service, the user will provide his informations.
     * Once done, the third party tool will call {redirect_url}.
     * After that, we will have to retrieve the session with its ID.
     * @param redirect_url url called by the payment service once user is done filling its information
     * @returns Promise of the Session ID
     */
    createSessionToSaveUsersPaymentInformation(redirect_url: string): Promise<SessionId>;

    /**
     * 
     * @param session_id Id of the third party service's Session 
     */
    retrieveUserStoredPaymentInformationId(session_id: string): Promise<string>;
}