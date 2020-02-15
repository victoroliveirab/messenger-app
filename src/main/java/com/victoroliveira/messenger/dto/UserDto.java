package com.victoroliveira.messenger.dto;

import com.victoroliveira.messenger.models.UserModel;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

public class UserDto implements Serializable { // VIEW
    private Long id;
    private String name;
    private String username;
    private String email;
    private Date birthday;
    private String password;
    private boolean online;

    public UserDto(UserModel userModel) {
        this.id = userModel.getId();
        this.name = userModel.getName();
        this.username = userModel.getUsername();
        this.email = userModel.getEmail();
        this.birthday = userModel.getBirthday();
        this.password = userModel.getPassword();
        this.online = userModel.isOnline();
    }

    public UserDto() {
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

}
