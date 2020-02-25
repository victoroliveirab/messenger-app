package com.victoroliveira.messenger.utils;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.beans.BeanUtils;

//BeanUtils Reference
//http://www.appsdeveloperblog.com/dto-to-entity-and-entity-to-dto-conversion/

public class ProfileToProfileDtoConverter {
    public static ProfileDto convert(Profile profile) {
        ProfileDto dto = new ProfileDto();
        BeanUtils.copyProperties(profile, dto, "password", "friends", "followedBy", "id");
        dto.setContacts(profile.getContactsUsernames());
        dto.setContactOf(profile.getContactOfUsernames());
        return dto;
    }


    public static ProfileDto convertNew(Profile profile) {
        ProfileDto dto = new ProfileDto();
        BeanUtils.copyProperties(profile, dto, "password", "friends", "followedBy", "id");
        return dto;
    }
}
