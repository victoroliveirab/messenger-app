package com.victoroliveira.messenger.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.lang.reflect.Array;
import java.util.*;

@Entity
@Table(name = "USERS")
public class Profile implements Serializable {
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

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name = "following",
               joinColumns = {@JoinColumn(name="user_id")},
               inverseJoinColumns = {@JoinColumn(name="follower_id")}
               )
    private List<Profile> friends = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "following",
               joinColumns = {@JoinColumn(name="follower_id")},
               inverseJoinColumns = {@JoinColumn(name="user_id")}
               )
    private List<Profile> followedBy = new ArrayList<>();

    public Profile() {
    }

    public Profile(String name, String username, String email, String password) {
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

    public List<Profile> getFriends() {
        return friends;
    }

    public void setFriends(List<Profile> friends) {
        this.friends = friends;
    }

    public void addFriend(Profile friend) {
        this.friends.add(friend);
    }

    public List<Profile> getFollowedBy() {
        return followedBy;
    }

    public void setFollowedBy(List<Profile> followedBy) {
        this.followedBy = followedBy;
    }

    public void addFollowedBy(Profile follower) {
        this.followedBy.add(follower);
    }
}

