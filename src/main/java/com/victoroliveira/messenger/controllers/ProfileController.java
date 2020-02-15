package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.service.ProfileService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

// Controller access only Service

@RestController
public class ProfileController {
    private ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }


//    @GetMapping(value="/users")
//    public List<UserDto> getUsers() {
//        System.out.println("GET /users");
//        return userService.getUsers().stream().map(UserDto::new).collect(Collectors.toList());
//    }

    @GetMapping(value="/users")
    public List<ProfileDto> getUsers() {
        List<ProfileDto> dtos = new ArrayList<>();
        for (Profile profile : profileService.getUsers()) {
            ProfileDto dto = new ProfileDto();
            BeanUtils.copyProperties(profile, dto);
            dtos.add(dto);
        }
        return dtos;
    }

    @PostMapping("/users")
    @ResponseBody
    public ResponseEntity<ProfileDto> newUser(@RequestBody ProfileDto newUser) {
        if (newUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Profile newEntry = new Profile();
        BeanUtils.copyProperties(newUser, newEntry);
        profileService.addUser(newEntry);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users/{id1}/add/{id2}")
    @ResponseBody
    public String addFriend(@PathVariable long id1, @PathVariable long id2) {
        Optional<Profile> user1 = profileService.findById(id1);
        Optional<Profile> user2 = profileService.findById(id2);
        if (!user1.isPresent() || !user2.isPresent()) {
            return "ERROR";
        }
        return "ADDED";
    }

    @GetMapping("/users/{username}")
    Optional<Profile> getUser(@PathVariable String username) {
        System.out.println("Find user with username = " + username);
        return profileService.findByUsername(username);
    }

}
