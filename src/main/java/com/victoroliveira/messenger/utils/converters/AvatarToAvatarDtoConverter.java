package com.victoroliveira.messenger.utils.converters;

import com.victoroliveira.messenger.dto.AvatarDto;
import com.victoroliveira.messenger.models.Avatar;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.beans.BeanUtils;

public class AvatarToAvatarDtoConverter {
    public static AvatarDto convert(Avatar avatar) {
        AvatarDto avatarDto = new AvatarDto();
        Profile profile = avatar.getProfile();
        BeanUtils.copyProperties(avatar, avatarDto, "profile");
        avatarDto.setUsername(profile.getUsername());
        return avatarDto;
    }
}

