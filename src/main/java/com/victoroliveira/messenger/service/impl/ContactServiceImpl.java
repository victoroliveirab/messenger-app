package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.AutoAddException;
import com.victoroliveira.messenger.exceptions.FriendAlreadyAddedException;
import com.victoroliveira.messenger.exceptions.FriendNotAddedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.ContactService;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    private ProfileRepository profileRepository;

    public ContactServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public void addFriend(Profile owner, Profile friend) {
        if (owner.getFriendsUsernames().contains(friend.getUsername())) {
            throw new FriendAlreadyAddedException(friend.getUsername());
        }
        if (owner.getUsername().equals(friend.getUsername())) {
            throw new AutoAddException();
        }
        owner.addFriend(friend);
        profileRepository.save(owner);
        profileRepository.save(friend);
    }

    @Override
    public void removeFriend(Profile owner, Profile friend) {
        if (!owner.getFriendsUsernames().contains(friend.getUsername())) {
            throw new FriendNotAddedException(friend.getUsername());
        }
        owner.removeFriend(friend);
        profileRepository.save(owner);
        profileRepository.save(friend);
    }

}
