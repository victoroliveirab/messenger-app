package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.exceptions.SameOriginDestinationException;
import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.MessageRepository;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.impl.MessageServiceImpl;
import com.victoroliveira.messenger.service.impl.ProfileServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MessageServiceTest {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ProfileRepository profileRepository;

    private MessageService messageService;
    private Message message = new Message();
    private String username1 = "victor";
    private String username2 = "oliveira";

    @BeforeEach
    void setup() {
        messageService = new MessageServiceImpl(new ProfileServiceImpl(new BCryptPasswordEncoder(), profileRepository), messageRepository);

        Profile profile1 = new Profile();
        Profile profile2 = new Profile();

        profile1.setName("Victor");
        profile1.setUsername(username1);
        profile1.setBirthday(LocalDate.of(1992, 03, 16));
        profile1.setPassword("Victor1@@@");
        profile1.setEmail("victor@example.com");

        profile2.setName("Oliveira");
        profile2.setUsername(username2);
        profile2.setBirthday(LocalDate.of(1992, 03, 16));
        profile2.setPassword("Victor1@@@");
        profile2.setEmail("oliveira@example.com");

        profileRepository.save(profile1);
        profileRepository.save(profile2);

        message.setSourceProfile(profileRepository.findByUsername(profile1.getUsername()));
        message.setDestinationProfile(profileRepository.findByUsername(profile2.getUsername()));
        message.setSendTime(LocalDateTime.now());
        message.setMessage("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        messageRepository.save(message);
    }

    @Test
    void getMessagesFromAnotherProfile() {
        Profile profile1 = profileRepository.findByUsername(username1);
        Profile profile2 = profileRepository.findByUsername(username2);
        Assertions.assertThat(messageService.getMessages(profile1.getUsername(), profile2.getUsername())).hasSize(1);
        Assertions.assertThat(messageService.getMessages(profile1.getUsername(), profile2.getUsername()).get(0)
                .getMessage()).isEqualTo(message.getMessage());
    }

    @Test
    void getMessagesFromSameProfile() {
        try {
            messageService.sendMessage(message, username1, username1);
            Assertions.fail("Cannot get messages from yourself");
        } catch (SameOriginDestinationException ignored) {
        }
    }

    @Test
    void sendMessageToAnotherProfile() {
        Profile profile1 = profileRepository.findByUsername(username1);
        Profile profile2 = profileRepository.findByUsername(username2);
        Message message = new Message();
        message.setMessage("The brown fox jumped over the lazy dog");
        messageService.sendMessage(message, username1, username2);
        Assertions.assertThat(messageService.getMessages(profile1.getUsername(), profile2.getUsername())).hasSize(2);
    }

    @Test
    void sendMessageToSameProfile() {
        Message message = new Message();
        message.setSendTime(LocalDateTime.now());
        message.setMessage("The brown fox jumped over the lazy dog");
        try {
            messageService.sendMessage(message, username1, username1);
            Assertions.fail("Cannot send message to yourself");
        } catch (SameOriginDestinationException ignored) {
        }
    }
}