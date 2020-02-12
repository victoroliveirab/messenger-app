package com.victoroliveira.messenger.models;

import java.util.Date;

public class User {
    private String name;
    private String username;
    private Date birthday;

    public User(String name, String username, Date birthday) {
        this.name = name;
        this.username = username;
        this.birthday = birthday;
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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
}
