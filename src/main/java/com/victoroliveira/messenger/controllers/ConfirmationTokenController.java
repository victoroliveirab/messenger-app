package com.victoroliveira.messenger.controllers;


import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.exceptions.InvalidConfirmationTokenException;
import com.victoroliveira.messenger.models.ConfirmationToken;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.service.ConfirmationTokenService;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.converters.ProfileToProfileDtoConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfirmationTokenController {

    private ConfirmationTokenService confirmationTokenService;
    private ProfileService profileService;

    public ConfirmationTokenController(ConfirmationTokenService confirmationTokenService, ProfileService profileService) {
        this.confirmationTokenService = confirmationTokenService;
        this.profileService = profileService;
    }

    @RequestMapping(value="/confirmation", method={RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<ProfileDto> confirmAccount(@RequestParam("token") String token) {
        ConfirmationToken trueToken = confirmationTokenService.findByConfirmationToken(token);
        if (trueToken == null) {
            throw new InvalidConfirmationTokenException();
        }
        Profile profile = profileService.findByUsername(trueToken.getProfile().getUsername());
        profile.setConfirmed(true);
        profileService.updateUser(profile);
        ProfileDto profileDto = ProfileToProfileDtoConverter.convertNew(profile);
        return new ResponseEntity<>(profileDto, HttpStatus.OK);
    }

}