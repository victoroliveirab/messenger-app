package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.EmptyFieldException;
import com.victoroliveira.messenger.exceptions.UniqueEmailException;
import com.victoroliveira.messenger.exceptions.UniqueUsernameException;
import com.victoroliveira.messenger.models.User;
import com.victoroliveira.messenger.repository.UserRepository;
import com.victoroliveira.messenger.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll().size() != 0 ? userRepository.findAll() : null;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User addUser(User user) {
        checkEmptiness(user);
        checkSize(user);
        checkExistence(user);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    //helpers

    private void checkEmptiness(User user) {
        if (StringUtils.isEmpty(user.getName())) {
            throw new EmptyFieldException("name");
        }
        if (StringUtils.isEmpty(user.getUsername())) {
            throw new EmptyFieldException("username");
        }
        if (StringUtils.isEmpty(user.getEmail())) {
            throw new EmptyFieldException("email");
        }
        if (StringUtils.isEmpty(user.getBirthday())) {
            throw new EmptyFieldException("birthday");
        }
    }

    private void checkSize(User user) {
        //todo
    }

    private void checkExistence(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UniqueUsernameException(user.getUsername());
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UniqueEmailException(user.getEmail());
        }
    }

}
