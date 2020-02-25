package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Profile;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface ProfileService extends UserDetailsService {
    List<Profile> getUsers();
    Profile findByUsername(String username);
    Profile addUser(Profile profile);
    Profile updateUser(Profile profile);

    Profile findById(Long id);

    void removeUser(String username);
}
