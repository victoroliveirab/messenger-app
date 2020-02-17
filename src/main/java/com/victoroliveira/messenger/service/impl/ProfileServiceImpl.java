package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.*;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;


@Service
public class ProfileServiceImpl implements ProfileService {

    private static final String nameRegex = "^[\\p{L} .'-]+$";

    private static final String usernameRegex = "^[\\w]+$";

    private static final String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";

    //RECOMMENDED
    //private static final String emailRegex = "^[\\\\w!#$%&’*+/=?`{|}~^-]+(?:\\\\.[\\\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\\\.)+[a-zA-Z]{2,6}$";

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public List<Profile> getUsers() {
        return profileRepository.findAll().size() != 0 ? profileRepository.findAll() : null;
    }

    @Override
    public Optional<Profile> findByUsername(String username) {
        return profileRepository.findByUsername(username);
    }

    @Override
    public Profile addUser(Profile profile) {
        checkEmptiness(profile);
        checkSize(profile);
        checkUniqueness(profile);
        checkFormat(profile);
        checkBirthday(profile);
        profile.setOnline(false);
        return profileRepository.save(profile);
    }

    @Override
    public void addFriend(Profile owner, Profile friend) {
        owner.addFriend(friend);
        profileRepository.save(owner);
    }

    @Override
    public void addFollower(Profile follower, Profile followed) {
        followed.addFollowedBy(follower);
        profileRepository.save(followed);
    }

    @Override
    public Optional<Profile> findById(Long id) {
        return profileRepository.findById(id);
    }

    //helpers

    private void checkEmptiness(Profile profile) {
        if (StringUtils.isEmpty(profile.getName())) {
            throw new EmptyFieldException("name");
        }
        if (StringUtils.isEmpty(profile.getUsername())) {
            throw new EmptyFieldException("username");
        }
        if (StringUtils.isEmpty(profile.getEmail())) {
            throw new EmptyFieldException("email");
        }
        if (StringUtils.isEmpty(profile.getBirthday())) {
            throw new EmptyFieldException("birthday");
        }
        if (StringUtils.isEmpty(profile.getPassword())) {
            throw new EmptyFieldException("password");
        }
    }

    private void checkSize(Profile profile) {
        if (profile.getName().length() < 3 || profile.getName().length() > 32) {
            throw new InvalidLengthException("name");
        }
        if (profile.getUsername().length() < 3 || profile.getUsername().length() > 16) {
            throw new InvalidLengthException("username");
        }
    }

    private void checkUniqueness(Profile profile) {
        if (profileRepository.findByUsername(profile.getUsername()).isPresent()) {
            throw new UniqueUsernameException(profile.getUsername());
        }
        if (profileRepository.findByEmail(profile.getEmail()).isPresent()) {
            throw new UniqueEmailException(profile.getEmail());
        }
    }

    private void checkFormat(Profile profile) {
        if (!profile.getName().matches(nameRegex)) {
            throw new InvalidInputException("name");
        }
        if (!profile.getUsername().matches(usernameRegex)) {
            throw new InvalidInputException("username");
        }
        if (!profile.getEmail().matches(emailRegex)) {
            throw new InvalidInputException("email");
        }
    }

    private void checkBirthday(Profile profile) {
        /*
        if (!DateUtils.isValid(profile.getBirthday())) {
            throw new InvalidDateException();
        }
         */
        if (!DateUtils.over18(profile.getBirthday())) {
            throw new UnderageException();
        }
    }

}
