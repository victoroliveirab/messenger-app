package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.ProfileDtoToProfileConverter;
import com.victoroliveira.messenger.utils.ProfileToProfileDtoConverter;
import org.apache.coyote.Response;
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

    @GetMapping(value="/users")
    public ResponseEntity<List<ProfileDto>> getUsers() {
        List<ProfileDto> dtos = new ArrayList<>();
        for (Profile profile : profileService.getUsers()) {
            ProfileDto dto = ProfileToProfileDtoConverter.convert(profile);
            dtos.add(dto);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping("/users")
    @ResponseBody
    public ResponseEntity<ProfileDto> newUser(@RequestBody ProfileDto newUserDto) {
        if (newUserDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // NO_CONTENT?
        }
        Profile newUser = ProfileDtoToProfileConverter.convert(newUserDto);
        profileService.addUser(newUser);
        ProfileDto dto = ProfileToProfileDtoConverter.convertNew(newUser);
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

    @PostMapping("/users/{id1}/add/{id2}")
    @ResponseBody
    public String addFriend(@PathVariable long id1, @PathVariable long id2) {
        Optional<Profile> user1 = profileService.findById(id1);
        Optional<Profile> user2 = profileService.findById(id2);
        if (!user1.isPresent() || !user2.isPresent()) {
            return "ERROR";
        }
        Profile owner = user1.get();
        Profile target = user2.get();
        profileService.addFriend(owner, target);
        profileService.addFollower(owner, target);
        return "ADDED";
    }

    @GetMapping("/users/{username}")
    Optional<Profile> getUser(@PathVariable String username) {
        System.out.println("Find user with username = " + username);
        return profileService.findByUsername(username);
    }

}
