package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.UserModel;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserModel> getUsers();
    Optional<UserModel> findByUsername(String username);
    UserModel addUser(UserModel userModel);
    //UserModel addFriend(UserModel userAdding, UserModel userAdded);

    Optional<UserModel> findById(Long id);
}
