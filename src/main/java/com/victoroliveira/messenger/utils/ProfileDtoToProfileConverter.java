package com.victoroliveira.messenger.utils;

import com.victoroliveira.messenger.dto.ProfileDto;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.beans.BeanUtils;

//BeanUtils Reference
//http://www.appsdeveloperblog.com/dto-to-entity-and-entity-to-dto-conversion/

public class ProfileDtoToProfileConverter {
    public static Profile convert(ProfileDto profileDto) {
        Profile profile = new Profile();
        BeanUtils.copyProperties(profileDto, profile);
        return profile;
    }
}
