package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.EmptyFieldException;
import com.victoroliveira.messenger.exceptions.UniqueEmailException;
import com.victoroliveira.messenger.exceptions.UniqueUsernameException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.ProfileRepository;
import com.victoroliveira.messenger.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;


@Service
public class ProfileServiceImpl implements ProfileService {

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
        checkExistence(profile);
        return profileRepository.save(profile);
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
//        if (StringUtils.isEmpty(user.getBirthday())) {
//            throw new EmptyFieldException("birthday");
//        }
    }

    private void checkSize(Profile profile) {
        //todo
    }

    private void checkExistence(Profile profile) {
        if (profileRepository.findByUsername(profile.getUsername()).isPresent()) {
            throw new UniqueUsernameException(profile.getUsername());
        }
        if (profileRepository.findByEmail(profile.getEmail()).isPresent()) {
            throw new UniqueEmailException(profile.getEmail());
        }
    }

}
