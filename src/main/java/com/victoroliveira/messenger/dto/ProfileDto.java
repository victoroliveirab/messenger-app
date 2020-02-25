package com.victoroliveira.messenger.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.victoroliveira.messenger.models.Profile;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProfileDto implements Serializable {
    private Long id;
    private String name;
    private String username;
    private String email;
    private LocalDate birthday;
    private String password;
    private boolean online;
    private List<String> contacts;
    private List<String> contactOf;
    private String token;
    private boolean confirmed;

    public ProfileDto(Profile profile) {
        this.id = profile.getId();
        this.name = profile.getName();
        this.username = profile.getUsername();
        this.email = profile.getEmail();
        this.password = profile.getPassword();
        this.birthday = profile.getBirthday();
        this.online = profile.isOnline();
        this.contacts = null;
        this.contactOf = null;
        this.token = null;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public List<String> getContacts() {
        return contacts;
    }

    public void setContacts(List<String> contacts) {
        this.contacts = contacts;
    }

    public List<String> getContactOf() {
        return contactOf;
    }

    public void setContactOf(List<String> contactOf) {
        this.contactOf = contactOf;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
