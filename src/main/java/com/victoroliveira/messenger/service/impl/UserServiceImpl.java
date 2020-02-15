package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.exceptions.EmptyFieldException;
import com.victoroliveira.messenger.exceptions.UniqueEmailException;
import com.victoroliveira.messenger.exceptions.UniqueUsernameException;
import com.victoroliveira.messenger.models.UserModel;
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
    public List<UserModel> getUsers() {
        return userRepository.findAll().size() != 0 ? userRepository.findAll() : null;
    }

    @Override
    public Optional<UserModel> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserModel addUser(UserModel userModel) {
        checkEmptiness(userModel);
        checkSize(userModel);
        checkExistence(userModel);
        return userRepository.save(userModel);
    }

    @Override
    public Optional<UserModel> findById(Long id) {
        return userRepository.findById(id);
    }

    //helpers

    private void checkEmptiness(UserModel userModel) {
        if (StringUtils.isEmpty(userModel.getName())) {
            throw new EmptyFieldException("name");
        }
        if (StringUtils.isEmpty(userModel.getUsername())) {
            throw new EmptyFieldException("username");
        }
        if (StringUtils.isEmpty(userModel.getEmail())) {
            throw new EmptyFieldException("email");
        }
//        if (StringUtils.isEmpty(user.getBirthday())) {
//            throw new EmptyFieldException("birthday");
//        }
    }

    private void checkSize(UserModel userModel) {
        //todo
    }

    private void checkExistence(UserModel userModel) {
        if (userRepository.findByUsername(userModel.getUsername()).isPresent()) {
            throw new UniqueUsernameException(userModel.getUsername());
        }
        if (userRepository.findByEmail(userModel.getEmail()).isPresent()) {
            throw new UniqueEmailException(userModel.getEmail());
        }
    }

}
