package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Profile;

public interface ContactService {
    void addContact(Profile owner, Profile contact);
    void removeContact(Profile owner, Profile contact);
}
