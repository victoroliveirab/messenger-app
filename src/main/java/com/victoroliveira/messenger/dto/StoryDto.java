package com.victoroliveira.messenger.dto;

import com.victoroliveira.messenger.models.Profile;
import java.time.LocalDateTime;

public class StoryDto {
    private Long id;
    private Profile profile;
    private LocalDateTime postTime;
    private String text;
    private boolean onlyBestFriends;
    private byte[] backgroundImage;

    public StoryDto() {
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

    public LocalDateTime getPostTime() {
        return postTime;
    }

    public void setPostTime(LocalDateTime postTime) {
        this.postTime = postTime;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isOnlyBestFriends() {
        return onlyBestFriends;
    }

    public void setOnlyBestFriends(boolean onlyBestFriends) {
        this.onlyBestFriends = onlyBestFriends;
    }

    public byte[] getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(byte[] backgroundImage) {
        this.backgroundImage = backgroundImage;
    }
}
