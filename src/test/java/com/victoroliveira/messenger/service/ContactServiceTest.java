package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.exceptions.AutoAddException;
import com.victoroliveira.messenger.exceptions.FriendAlreadyAddedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.MessageRepository;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.impl.ContactServiceImpl;
import com.victoroliveira.messenger.service.impl.ProfileServiceImpl;
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
    void addFriendThatIsNew() {
        contactService.addFriend(adder, added);
        contactService.addFriend(adder, other);
        contactService.addFriend(other, added);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getFriendsUsernames())
                .contains(added.getUsername());
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getFriendsUsernames())
                .contains(other.getUsername());
        Assertions.assertThat(profileRepository.findByUsername(other.getUsername()).getFriendsUsernames())
                .contains(added.getUsername());
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getFriends()).hasSize(0);
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getFollowedBy()).hasSize(2);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getFollowedBy()).hasSize(0);
    }

    @Test
    void addFriendAutoAdd() {
        try {
            contactService.addFriend(adder, adder);
            Assertions.fail("Cannot add yourself as contact");
        } catch (AutoAddException ignore) {
        }
    }

    @Test
    void addFriendThatIsAlreadyAdded() {
        contactService.addFriend(adder, added);
        try {
            contactService.addFriend(adder, added);
            Assertions.fail("Cannot add a contact that is already added");
        } catch (FriendAlreadyAddedException ignore) {
        }
    }

    @Test
    void removeFriend() {
        contactService.addFriend(adder, added);
        contactService.addFriend(adder, other);
        contactService.addFriend(other, added);
        contactService.removeFriend(adder, other);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getFriends()).hasSize(1);
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getFollowedBy()).hasSize(2);
        contactService.removeFriend(other, added);
        Assertions.assertThat(profileRepository.findByUsername(adder.getUsername()).getFriends()).hasSize(1);
        Assertions.assertThat(profileRepository.findByUsername(other.getUsername()).getFollowedBy()).hasSize(1);
        Assertions.assertThat(profileRepository.findByUsername(added.getUsername()).getFriends()).hasSize(0);
    }
}