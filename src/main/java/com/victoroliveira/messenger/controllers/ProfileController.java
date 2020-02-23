package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.exceptions.FriendNotAddedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.security.SecurityConstants;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.ProfileDtoToProfileConverter;
import com.victoroliveira.messenger.utils.ProfileToProfileDtoConverter;
import com.victoroliveira.messenger.utils.TokenToUsername;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

// Controller access only Service

@RestController
public class ProfileController {

    @Autowired
    private ProfileService profileService;

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
            System.out.println("Received empty body");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // NO_CONTENT?
        }
        System.out.println("Creating new user called " + newUserDto.getUsername());
        Profile newUser = ProfileDtoToProfileConverter.convert(newUserDto);
        profileService.addUser(newUser);
        ProfileDto dto = ProfileToProfileDtoConverter.convertNew(newUser);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<ProfileDto> getUser(@PathVariable String username) {
        //Optional<Profile> profileOpt = profileService.findByUsername(username);
        Profile profile = profileService.findByUsername(username);
        if (profile == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        ProfileDto dto = ProfileToProfileDtoConverter.convert(profile);
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

}
