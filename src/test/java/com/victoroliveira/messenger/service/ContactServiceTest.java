package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.exceptions.AutoAddException;
import com.victoroliveira.messenger.exceptions.ContactAlreadyAddedException;
import com.victoroliveira.messenger.exceptions.ContactNotAddedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.MessageRepository;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.impl.ContactServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@DataJpaTest
class ContactServiceTest {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private MessageRepository messageRepository;

    private ContactService contactService;

    private Profile adder, added, other;

    @BeforeEach
    void setup() {
        contactService = new ContactServiceImpl(profileRepository);
        Profile profile1 = new Profile();
        Profile profile2 = new Profile();
        Profile profile3 = new Profile();

        profile1.setName("Victor");
        profile1.setUsername("victor");
        profile1.setBirthday(LocalDate.of(1992, 03, 16));
        profile1.setPassword("Victor1@@@");
        profile1.setEmail("victor@example.com");

        profile2.setName("Oliveira");
        profile2.setUsername("oliveira");
        profile2.setBirthday(LocalDate.of(1992, 03, 16));
        profile2.setPassword("Victor1@@@");
        profile2.setEmail("oliveira@example.com");

        profile3.setName("Barbosa");
        profile3.setUsername("barbosa");
        profile3.setBirthday(LocalDate.of(1992, 03, 16));
        profile3.setPassword("Victor1@@@");
        profile3.setEmail("barbosa@example.com");

        profileRepository.save(profile1);
        profileRepository.save(profile2);
        profileRepository.save(profile3);

        adder = profileRepository.findByUsername(profile1.getUsername());
        added = profileRepository.findByUsername(profile2.getUsername());
        other = profileRepository.findByUsername(profile3.getUsername());
    }

    @Test
    void addContactThatIsNew() {
        contactService.addContact(adder, added);
        contactService.addContact(adder, other);
        contactService.addContact(other, added);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getContactsUsernames())
                .contains(added.getUsername());
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getContactsUsernames())
                .contains(other.getUsername());
        Assertions.assertThat(profileRepository.findByUsername(other.getUsername()).getContactsUsernames())
                .contains(added.getUsername());
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getContacts()).hasSize(0);
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getContactOf()).hasSize(2);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getContactOf()).hasSize(0);
    }

    @Test
    void addContactAutoAdd() {
        try {
            contactService.addContact(adder, adder);
            Assertions.fail("Cannot add yourself as contact");
        } catch (AutoAddException ignore) {
        }
    }

    @Test
    void addContactThatIsAlreadyAdded() {
        contactService.addContact(adder, added);
        try {
            contactService.addContact(adder, added);
            Assertions.fail("Cannot add a contact that is already added");
        } catch (ContactAlreadyAddedException ignore) {
        }
    }

    @Test
    void removeContactThatIsAdded() {
        contactService.addContact(adder, added);
        contactService.addContact(adder, other);
        contactService.addContact(other, added);
        contactService.removeContact(adder, other);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getContacts()).hasSize(1);
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getContactOf()).hasSize(2);
        contactService.removeContact(other, added);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getContacts()).hasSize(1);
        Assertions.assertThat(profileRepository.findByUsername(other.getUsername()).getContactOf()).hasSize(1);
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getContacts()).hasSize(0);
    }

    @Test
    void removeContactNotAdded() {
        contactService.addContact(adder, added);
        contactService.addContact(adder, other);
        contactService.addContact(other, added);
        try {
            contactService.removeContact(added, adder);
            Assertions.fail("Cannot remove a contact that you did not added");
        } catch (ContactNotAddedException ignore) {
        }
    }
}