package com.victoroliveira.messenger.service.impl;

import com.victoroliveira.messenger.models.Avatar;
import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.repository.AvatarRepository;
import com.victoroliveira.messenger.service.AvatarService;
import com.victoroliveira.messenger.service.ProfileService;
import com.victoroliveira.messenger.utils.ImageToByteArray;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AvatarServiceImpl implements AvatarService {

    private ProfileService profileService;
    private AvatarRepository avatarRepository;

    public AvatarServiceImpl(ProfileService profileService, AvatarRepository avatarRepository) {
        this.profileService = profileService;
        this.avatarRepository = avatarRepository;
    }

    @Override
    public Avatar createRandomImage(Profile profile) {
        Avatar avatar = new Avatar();
        avatar.setProfile(profile);
        byte[] img = ImageToByteArray.convert();
        avatar.setImage(img);
        avatar.setId(profile.getId());
        return avatarRepository.save(avatar);
    }

    @Override
    public Avatar uploadImage(Profile profile, MultipartFile image) {
        String fileName = StringUtils.cleanPath(image.getOriginalFilename());
        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Error in file"); //todo implement custom exception
            }
            Avatar avatar = new Avatar();
            avatar.setProfile(profile);
            avatar.setImage(image.getBytes());
            avatar.setId(profile.getId());
            return avatarRepository.save(avatar);
        } catch (IOException err) {
            throw new RuntimeException("Error while saving image. Try again"); // todo implement custom exception
        }
    }

    @Override
    public Avatar findByProfileId(Profile profile) {
        return avatarRepository.findByProfile(profile);
    }
}
