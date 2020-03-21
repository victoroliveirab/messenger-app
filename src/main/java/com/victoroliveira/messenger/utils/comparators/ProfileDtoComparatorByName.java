package com.victoroliveira.messenger.utils.comparators;

import com.victoroliveira.messenger.dto.ProfileDto;

import java.util.Comparator;

public class ProfileDtoComparatorByName implements Comparator<ProfileDto> {
    @Override
    public int compare(ProfileDto dto1, ProfileDto dto2) {
        return dto1.getUsername().compareTo(dto2.getUsername());
    }
}
