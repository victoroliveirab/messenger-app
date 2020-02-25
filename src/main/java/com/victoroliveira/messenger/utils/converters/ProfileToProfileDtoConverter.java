package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

//BeanUtils Reference
//http://www.appsdeveloperblog.com/dto-to-entity-and-entity-to-dto-conversion/

public class ProfileToProfileDtoConverter {
    public static ProfileDto convert(Profile profile) {
        ProfileDto dto = new ProfileDto();
        BeanUtils.copyProperties(profile, dto, "password", "contacts", "contactOf", "id");
        dto.setContacts(profile.getContactsUsernames());
        dto.setContactOf(profile.getContactOfUsernames());
        return dto;
    }


    public static ProfileDto convertNew(Profile profile) {
        ProfileDto dto = new ProfileDto();
        BeanUtils.copyProperties(profile, dto, "password", "contacts", "contactOf", "id");
        return dto;
    }

    public static List<ProfileDto> convertAll(List<Profile> profiles) {
            return profiles.stream().map(ProfileToProfileDtoConverter::convert).collect(Collectors.toList());
    }
}
