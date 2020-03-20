package com.victoroliveira.messenger.service;

import com.victoroliveira.messenger.models.Avatar;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.web.multipart.MultipartFile;

public interface AvatarService {
    Avatar createRandomImage(Profile profile);
    Avatar uploadImage(Profile profile, MultipartFile image);
    Avatar findByProfileId(Profile profile);
}
