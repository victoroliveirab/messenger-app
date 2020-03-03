package com.victoroliveira.messenger.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.victoroliveira.messenger.models.Profile;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageDto {
    private Long id;
    private Profile sourceProfile;
    private Profile destinationProfile;
    private String sourceUsername;
    private String destinationUsername;
    private LocalDateTime sendTime;
    private String message;

    public MessageDto() {
    }

    public MessageDto(Long id, Profile sourceProfile, Profile destinationProfile, LocalDateTime sendTime) {
        this.id = id;
        this.sourceProfile = sourceProfile;
        this.destinationProfile = destinationProfile;
        this.sendTime = sendTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Profile getSourceProfile() {
        return sourceProfile;
    }

    public void setSourceProfile(Profile sourceProfile) {
        this.sourceProfile = sourceProfile;
        this.sourceUsername = sourceProfile.getUsername();
    }

    public Profile getDestinationProfile() {
        return destinationProfile;
    }

    public void setDestinationProfile(Profile destinationProfile) {
        this.destinationProfile = destinationProfile;
        this.destinationUsername = destinationProfile.getUsername();
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSourceUsername() {
        return sourceUsername;
    }

    public void setSourceUsername(String sourceUsername) {
        this.sourceUsername = sourceUsername;
    }

    public String getDestinationUsername() {
        return destinationUsername;
    }

    public void setDestinationUsername(String destinationUsername) {
        this.destinationUsername = destinationUsername;
    }
}
