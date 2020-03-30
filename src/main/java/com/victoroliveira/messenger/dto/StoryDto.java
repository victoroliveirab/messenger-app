package com.victoroliveira.messenger.dto;

import com.victoroliveira.messenger.models.Profile;
import java.time.LocalDateTime;

public class StoryDto {
    private Long id;
    private String username;
    private LocalDateTime postTime;
    private String text;
    private boolean onlyBestFriends;
    private byte[] backgroundImage;
    private String gradient;
    private boolean whiteFont;

    public StoryDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getGradient() {
        return gradient;
    }

    public void setGradient(String gradient) {
        this.gradient = gradient;
    }

    public boolean isWhiteFont() {
        return whiteFont;
    }

    public void setWhiteFont(boolean whiteFont) {
        this.whiteFont = whiteFont;
    }
}
