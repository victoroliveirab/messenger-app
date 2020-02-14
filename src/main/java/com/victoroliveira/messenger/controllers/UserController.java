package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.UserDto;
import com.victoroliveira.messenger.models.User;
import com.victoroliveira.messenger.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

// Controller access only Service

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


//    @GetMapping(value="/users")
//    public List<UserDto> getUsers() {
//        System.out.println("GET /users");
//        return userService.getUsers().stream().map(UserDto::new).collect(Collectors.toList());
//    }

    @GetMapping(value="/users")
    public List<UserDto> getUsers() {
        List<UserDto> dtos = new ArrayList<>();
        for (User user : userService.getUsers()) {
            UserDto dto = new UserDto();
            BeanUtils.copyProperties(user, dto);
            dtos.add(dto);
        }
        return dtos;
    }

    @PostMapping("/users")
    @ResponseBody
    public ResponseEntity<UserDto> newUser(@RequestBody UserDto newUser) {
        if (newUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User newEntry = new User();
        BeanUtils.copyProperties(newUser, newEntry);
        userService.addUser(newEntry);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users/{username}")
    Optional<User> getUser(@PathVariable String username) {
        System.out.println("Find user with username = " + username);
        return userService.findByUsername(username);
    }

}
