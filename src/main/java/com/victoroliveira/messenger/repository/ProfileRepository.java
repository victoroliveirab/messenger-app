package com.victoroliveira.messenger.repository;

import com.victoroliveira.messenger.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repository access data base (?)

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Profile findByUsername(String username);

    Profile findByEmail(String email);

    /*
    User getUserById(Long id);

    User getUserByName(String name);

    User getUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);

     */
}
