package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.ProfileDto;
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

@RestController
public class ContactController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ContactService contactService;

    @GetMapping("/users/contacts")
    public ResponseEntity<List<ProfileDto>> friendsList(@RequestHeader(name = "Authorization") String token) { //TODO
        List<ProfileDto> contacts = new ArrayList<>();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PostMapping("/users/add/{contact}")
    @ResponseBody
    public ResponseEntity<ProfileDto> addContact(@RequestHeader(name = "Authorization") String token, @PathVariable String contact) {
        Profile contactProfile = profileService.findByUsername(contact);
        if (contactProfile == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = TokenToUsername.convert(token);
        Profile owner = profileService.findByUsername(username);
        contactService.addContact(owner, contactProfile);
        ProfileDto dto = ProfileToProfileDtoConverter.convert(owner);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{contact}") //delete contact
    @ResponseBody
    public ResponseEntity<ProfileDto> deleteFriend(@RequestHeader(name = "Authorization") String token, @PathVariable String contact) {
        Profile deletedContact = profileService.findByUsername(contact);
        if (deletedContact == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String username = TokenToUsername.convert(token);
        Profile owner = profileService.findByUsername(username);
        contactService.removeContact(owner, deletedContact);
        ProfileDto newDto = ProfileToProfileDtoConverter.convert(owner);
        return new ResponseEntity<>(newDto, HttpStatus.OK);
    }
}
