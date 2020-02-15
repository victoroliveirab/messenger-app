package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Profile;

import java.util.List;
import java.util.Optional;

public interface ProfileService {
    List<Profile> getUsers();
    Optional<Profile> findByUsername(String username);
    Profile addUser(Profile profile);
    //UserModel addFriend(UserModel userAdding, UserModel userAdded);

    Optional<Profile> findById(Long id);
}
