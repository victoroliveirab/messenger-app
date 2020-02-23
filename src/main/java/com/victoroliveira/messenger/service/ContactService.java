package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.exceptions.FriendNotAddedException;
import com.victoroliveira.messenger.models.Profile;

public interface ContactService {
    void addFriend(Profile owner, Profile friend);
    void removeFriend(Profile owner, Profile friend) throws FriendNotAddedException;
}
