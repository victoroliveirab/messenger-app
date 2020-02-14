package com.victoroliveira.messenger.repository;

import com.victoroliveira.messenger.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repository access data base (?)

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    /*
    User getUserById(Long id);

    User getUserByName(String name);

    User getUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);

     */
}
