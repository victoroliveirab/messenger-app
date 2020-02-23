package com.victoroliveira.messenger.repository;


import com.victoroliveira.messenger.models.Profile;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ProfileRepositoryTest {

    @Autowired
    private ProfileRepository profileRepository;

    Profile profile1, profile2, profile3;

    @BeforeAll
    void before() {
        profile1 = new Profile();
        profile2 = new Profile();
        profile3 = new Profile();

        profile1.setName("Victor");
        profile1.setUsername("victor");
        profile1.setBirthday(LocalDate.of(1992, 03, 16));
        profile1.setPassword("Victor1@@@");
        profile1.setEmail("victor@example.com");

        profileRepository.save(profile1);
    }

    @Test
    void findByUsername() {
        Profile profile = profileRepository.findByUsername(profile1.getUsername());
        Assertions.assertThat(profile).hasSameClassAs(profile1);
        Assertions.assertThat(profile.getUsername()).isEqualTo(profile1.getUsername());
    }

    @Test
    void findByEmail() {
        Profile profile = profileRepository.findByEmail(profile1.getEmail());
        Assertions.assertThat(profile).hasSameClassAs(profile1);
        Assertions.assertThat(profile.getEmail()).isEqualTo(profile1.getEmail());
    }
}