package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.AutoAddException;
import com.victoroliveira.messenger.exceptions.ContactAlreadyAddedException;
import com.victoroliveira.messenger.exceptions.ContactNotAddedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.ContactService;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private ProfileRepository profileRepository;

    public ContactServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public void addContact(Profile owner, Profile contact) {
        if (owner.getContactsUsernames().contains(contact.getUsername())) {
            throw new ContactAlreadyAddedException(contact.getUsername());
        }
        if (owner.getUsername().equals(contact.getUsername())) {
            throw new AutoAddException();
        }
        owner.addContact(contact);
        profileRepository.save(owner);
        profileRepository.save(contact);
        contact.addContactOf(owner);
    }

    @Override
    public void removeContact(Profile owner, Profile contact) {
        if (!owner.getContactsUsernames().contains(contact.getUsername())) {
            throw new ContactNotAddedException(contact.getUsername());
        }
        owner.removeContact(contact);
        profileRepository.save(owner);
        profileRepository.save(contact);
    }

}
