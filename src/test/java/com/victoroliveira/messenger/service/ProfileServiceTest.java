/*
package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.exceptions.UniqueEmailException;
import com.victoroliveira.messenger.exceptions.UniqueUsernameException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.impl.ProfileServiceImpl;
import com.victoroliveira.messenger.utils.CustomPasswordEncoder;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)

class ProfileServiceTest {

    @Autowired
    private ProfileRepository profileRepository;

    private ProfileService profileService;

    Profile profile1, profile2, profile3;

    @Rule
    public final ExpectedException exception = ExpectedException.none();

    @BeforeEach
    public void createProfiles() {
        profileService = new ProfileServiceImpl(*/
/*new BCryptPasswordEncoder()*//*
new CustomPasswordEncoder(), profileRepository);
        profile1 = new Profile();
        profile2 = new Profile();
        profile3 = new Profile();

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
    }

    @Test
    void getUsers() {
        Assertions.assertThat(profileService.getUsers()).contains(profile1);
        Assertions.assertThat(profileService.getUsers()).contains(profile2);
        Assertions.assertThat(profileService.getUsers()).hasSize(2);
    }

    @Test
    void findByUsername() {
        Assertions.assertThat(profileService.findByUsername(profile1.getUsername())).isEqualToComparingFieldByField(profile1);
        Assertions.assertThat(profileService.findByUsername(profile3.getUsername())).isNull();
    }

    @Test
    void addUser() {
        profileService.addUser(profile3);
        Assertions.assertThat(profileService.getUsers()).hasSize(3);
        Assertions.assertThat(profileService.findByUsername(profile3.getUsername())).isNotNull();
        try {
            profileService.addUser(profile3);
            Assertions.fail("Cannot add an user with same username");
        } catch (UniqueUsernameException ignored) {

        }
    }

    @Test
    void updateUser() {
        //TODO
    }

    @Test
    void findById() {
        Assertions.assertThat(profileService.findById(profile1.getId()).getUsername()).isEqualTo(profile1.getUsername());
    }

    @Test
    void removeUser() {
        profileService.removeUser(profile1.getUsername());
        Assertions.assertThat(profileService.findByUsername(profile1.getUsername())).isNull();
    }
}*/
