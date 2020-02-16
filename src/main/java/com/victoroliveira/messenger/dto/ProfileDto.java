package com.victoroliveira.messenger.dto;

import com.victoroliveira.messenger.models.Profile;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class ProfileDto implements Serializable { // VIEW
    private Long id;
    private String name;
    private String username;
    private String email;
    private Date birthday;
    private String password;
    private boolean online;
    private List<Profile> friends;
    private List<Profile> followedBy;

    public ProfileDto(Profile profile) {
        this.id = profile.getId();
        this.name = profile.getName();
        this.username = profile.getUsername();
        this.email = profile.getEmail();
        this.birthday = profile.getBirthday();
        this.password = profile.getPassword();
        this.online = profile.isOnline();
        this.friends = profile.getFriends();
        this.followedBy = profile.getFollowedBy();
    }

    public ProfileDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public List<Profile> getFriends() {
        return friends;
    }

    public void setFriends(List<Profile> friends) {
        this.friends = friends;
    }

    public List<Profile> getFollowedBy() {
        return followedBy;
    }

    public void setFollowedBy(List<Profile> followedBy) {
        this.followedBy = followedBy;
    }
}
