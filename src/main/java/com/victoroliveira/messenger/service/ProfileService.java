package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.exceptions.FriendNotAddedException;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface ProfileService extends UserDetailsService {
    List<Profile> getUsers();
    Optional<Profile> findByUsername(String username);
    Profile addUser(Profile profile);
    Profile updateUser(Profile profile);

    Optional<Profile> findById(Long id);

    void removeUser(String username);
}
