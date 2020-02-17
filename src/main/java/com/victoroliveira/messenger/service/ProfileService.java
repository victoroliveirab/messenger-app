package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.exceptions.FriendNotAddedException;
import com.victoroliveira.messenger.models.Profile;

import java.util.List;
import java.util.Optional;

public interface ProfileService {
    List<Profile> getUsers();
    Optional<Profile> findByUsername(String username);
    Profile addUser(Profile profile);
    Profile updateUser(Profile profile);

    void addFriend(Profile owner, Profile friend);
    void removeFriend(Profile owner, Profile friend) throws FriendNotAddedException;

    void addFollower(Profile follower, Profile followed);

    Optional<Profile> findById(Long id);

    void removeUser(String username);
}
