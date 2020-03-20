package com.victoroliveira.messenger.dto;

import com.victoroliveira.messenger.models.Profile;

public class AvatarDto {
    private Long id;
    private Profile profile;
    private byte[] image;
    private String username;

    public AvatarDto(Long id, Profile profile, byte[] image) {
        this.id = id;
        this.profile = profile;
        this.image = image;
    }

    public AvatarDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] img) {
        this.image = img;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
