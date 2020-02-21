package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.exceptions.FriendNotAddedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.ProfileDtoToProfileConverter;
import com.victoroliveira.messenger.utils.ProfileToProfileDtoConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

// Controller access only Service

@RestController
public class ProfileController {
    private ProfileService profileService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public ProfileController(ProfileService profileService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.profileService = profileService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

//    @PostMapping(value="/login")
//    public ResponseEntity<ProfileDto> login(@RequestBody ProfileDto profileDto) {
//        System.out.println("HERE");
//        Optional<Profile> profileOpt = profileService.findById(profileDto.getId());
//        if (!profileOpt.isPresent()) {
//            return new ResponseEntity<>(profileDto, HttpStatus.BAD_REQUEST);
//        }
//        if (!profileDto.getPassword().equals(profileOpt.get().getPassword())) {
//            return new ResponseEntity<>(profileDto, HttpStatus.BAD_REQUEST);
//        }
//        System.out.println("Login here");
//        return new ResponseEntity<>(profileDto, HttpStatus.OK);
//
//    }

    @GetMapping(value="/users")
    public ResponseEntity<List<ProfileDto>> getUsers() {
        List<ProfileDto> dtos = new ArrayList<>();
        for (Profile profile : profileService.getUsers()) {
            ProfileDto dto = ProfileToProfileDtoConverter.convert(profile);
            dtos.add(dto);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<ProfileDto> newUser(@RequestBody ProfileDto newUserDto) {
        if (newUserDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // NO_CONTENT?
        }
        System.out.println("Creating new user...");
        Profile newUser = ProfileDtoToProfileConverter.convert(newUserDto);
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        profileService.addUser(newUser);
        ProfileDto dto = ProfileToProfileDtoConverter.convertNew(newUser);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<ProfileDto> getUser(@PathVariable String username) {
        Optional<Profile> profileOpt = profileService.findByUsername(username);
        if (!profileOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        ProfileDto dto = ProfileToProfileDtoConverter.convert(profileOpt.get());
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping("/users/{username}") // todo: @PatchMapping
    public ResponseEntity<ProfileDto> updateUser(@PathVariable String username, @RequestBody ProfileDto profileDto) {
        if (profileDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // NO_CONTENT?
        }
        if (!username.equals(profileDto.getUsername())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Profile profile = ProfileDtoToProfileConverter.convert(profileDto);
        profileService.updateUser(profile);
        return new ResponseEntity<>(ProfileToProfileDtoConverter.convert(profile), HttpStatus.OK);
    }

    @DeleteMapping("/users/{username}")
    public ResponseEntity<ProfileDto> deleteUser(@PathVariable String username) {
        if (username == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        profileService.removeUser(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users/add/{id}")
    @ResponseBody
    public ResponseEntity<ProfileDto> addFriend(@PathVariable long id, @RequestBody ProfileDto profileDto) {
        Optional<Profile> addedFriend = profileService.findById(id);
        if (!addedFriend.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Profile owner = ProfileDtoToProfileConverter.convert(profileDto);
        Profile target = addedFriend.get();
        profileService.addFriend(owner, target);
        profileService.addFollower(owner, target);
        ProfileDto dto = ProfileToProfileDtoConverter.convert(owner);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{id}")
    @ResponseBody
    public ResponseEntity<ProfileDto> deleteFriend(@PathVariable long id, @RequestBody ProfileDto profileDto) throws FriendNotAddedException {
        Optional<Profile> deletedFriendOpt = profileService.findById(id);
        if (!deletedFriendOpt.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Profile deletedFriend = deletedFriendOpt.get();
        Profile owner = ProfileDtoToProfileConverter.convert(profileDto);
        profileService.removeFriend(owner, deletedFriend);
        ProfileDto newDto = ProfileToProfileDtoConverter.convert(owner);
        return new ResponseEntity<>(newDto, HttpStatus.OK);
    }

}
