package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

//BeanUtils Reference
//http://www.appsdeveloperblog.com/dto-to-entity-and-entity-to-dto-conversion/

public class ProfileDtoToProfileConverter {
    public static Profile convert(ProfileDto profileDto) {
        Profile profile = new Profile();
        BeanUtils.copyProperties(profileDto, profile);
        return profile;
    }

    public static List<Profile> convertAll(List<ProfileDto> profiles) {
        return profiles.stream().map(ProfileDtoToProfileConverter::convert).collect(Collectors.toList());
    }
}
