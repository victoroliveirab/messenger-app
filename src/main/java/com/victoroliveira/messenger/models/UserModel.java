package com.victoroliveira.messenger.models;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "USERS")
public class UserModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 32)
    @Column(nullable = false)
    private String name;

    @Size(max = 16)
    @Column(unique=true, nullable = false)
    private String username;

    @Email
    @Column(unique=true)
    private String email;

    @Temporal(TemporalType.DATE)
    @Column(nullable=true) //temp
    private Date birthday;

    @Column(nullable=false)
    private String password;

    @Column(nullable = false)
    private boolean online;

    /*
    @ManyToOne
    private UserModel userModel;

    @OneToMany(mappedBy = "userModel")
    private Set<UserModel> friends;
     */

    public UserModel() {
    }

    public UserModel(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.online = false;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }
}
