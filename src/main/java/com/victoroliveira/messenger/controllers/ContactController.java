package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.exceptions.FriendNotAddedException;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.service.ContactService;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.ProfileToProfileDtoConverter;
import com.victoroliveira.messenger.utils.TokenToUsername;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ContactController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ContactService contactService;

    @GetMapping("/users/contacts")
    public ResponseEntity<List<ProfileDto>> friendsList(@RequestHeader(name = "Authorization") String token) { //TODO
        List<ProfileDto> friends = new ArrayList<>();
        return new ResponseEntity<>(friends, HttpStatus.OK);
    }

    @PostMapping("/users/add/{friend}")
    @ResponseBody
    public ResponseEntity<ProfileDto> addFriend(@RequestHeader(name = "Authorization") String token, @PathVariable String friend) {
        Profile addedFriend = profileService.findByUsername(friend);
        if (addedFriend == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = TokenToUsername.convert(token);
        Profile owner = profileService.findByUsername(username);
        contactService.addFriend(owner, addedFriend);
        ProfileDto dto = ProfileToProfileDtoConverter.convert(owner);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{friend}") //delete friend
    @ResponseBody
    public ResponseEntity<ProfileDto> deleteFriend(@RequestHeader(name = "Authorization") String token, @PathVariable String friend) {
        Profile deletedFriend = profileService.findByUsername(friend);
        if (deletedFriend == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = TokenToUsername.convert(token);
        Profile owner = profileService.findByUsername(username);
        contactService.removeFriend(owner, deletedFriend);
        ProfileDto newDto = ProfileToProfileDtoConverter.convert(owner);
        return new ResponseEntity<>(newDto, HttpStatus.OK);
    }
}
