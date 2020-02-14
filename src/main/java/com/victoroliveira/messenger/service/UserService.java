package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();
    Optional<User> findByUsername(String username);
    User addUser(User user);

    Optional<User> findById(Long id);
}
