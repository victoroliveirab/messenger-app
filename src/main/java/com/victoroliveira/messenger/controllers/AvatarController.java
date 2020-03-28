package com.victoroliveira.messenger.controllers;

import com.victoroliveira.messenger.dto.AvatarDto;
import com.victoroliveira.messenger.models.Avatar;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.service.AvatarService;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.ImageToByteArray;
import com.victoroliveira.messenger.utils.converters.AvatarToAvatarDtoConverter;
import com.victoroliveira.messenger.utils.converters.TokenToUsernameConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class AvatarController {

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private ProfileService profileService;

    @GetMapping("/avatar")
    public ResponseEntity<AvatarDto> getOwnAvatar(@RequestHeader(name = "Authorization") String token) {
        String username = TokenToUsernameConverter.convert(token);
        Profile profile = profileService.findByUsername(username);
        Avatar avatar = avatarService.findByProfileId(profile);
        if (avatar == null) {
            System.out.println("user " + username + " does not have an avatarentend");
            avatar = ImageToByteArray.defaultAvatar();
            avatar.setProfile(profile);
        }
        AvatarDto avatarDto = AvatarToAvatarDtoConverter.convert(avatar);
        return new ResponseEntity<>(avatarDto, HttpStatus.OK);
    }

    @GetMapping("/avatar/{username}")
    public ResponseEntity<AvatarDto> getAvatar(@PathVariable String username) {
        Profile profile = profileService.findByUsername(username);
        Avatar avatar = avatarService.findByProfileId(profile);
        if (avatar == null) {
            System.out.println("user " + username + " does not have an avatarentend");
            avatar = ImageToByteArray.defaultAvatar();
            avatar.setProfile(profile);
        }
        AvatarDto avatarDto = AvatarToAvatarDtoConverter.convert(avatar);
        return new ResponseEntity<>(avatarDto, HttpStatus.OK);
    }

    @PostMapping("/avatar")
    public ResponseEntity<Avatar> uploadAvatar(@RequestHeader(name = "Authorization") String token, @RequestParam("file") MultipartFile file) {
        String username = TokenToUsernameConverter.convert(token);
        Profile profile = profileService.findByUsername(username);
        Avatar avatar = avatarService.uploadImage(profile, file);
        return new ResponseEntity<>(avatar, HttpStatus.OK);
    }
}
