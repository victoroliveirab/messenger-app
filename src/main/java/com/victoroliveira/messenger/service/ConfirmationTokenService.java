package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.ConfirmationToken;
import com.victoroliveira.messenger.models.Profile;

public interface ConfirmationTokenService {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
    void sendEmail(Profile profile);
}