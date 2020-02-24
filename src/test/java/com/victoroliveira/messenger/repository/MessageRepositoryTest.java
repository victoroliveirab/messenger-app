package com.victoroliveira.messenger.repository;

import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RunWith(SpringRunner.class)
@DataJpaTest
class MessageRepositoryTest {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ProfileRepository profileRepository;

    Profile sender, receiver;

    String txt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    @BeforeEach
    void before() {
        Profile profile1 = new Profile();
        Profile profile2 = new Profile();

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

        profileRepository.save(profile1);
        profileRepository.save(profile2);

        sender = profileRepository.findByUsername(profile1.getUsername());
        receiver = profileRepository.findByUsername(profile2.getUsername());

        Message message = new Message();
        message.setMessage(txt);
        message.setSendTime(LocalDateTime.now());
        message.setSourceProfile(sender);
        message.setDestinationProfile(receiver);
        messageRepository.save(message);
    }

    @Test
    void findAllBySourceProfileAndDestinationProfile() {
        List<Message> messages = messageRepository.findAllBySourceProfileAndDestinationProfile(sender, receiver);
        Assertions.assertThat(messages).hasSize(1);
        Assertions.assertThat(messages.get(0).getMessage()).isEqualTo(txt);
        Assertions.assertThat(messages.get(0).getSourceProfile().getUsername()).isEqualTo(sender.getUsername());
    }
}