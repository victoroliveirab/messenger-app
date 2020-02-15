package com.victoroliveira.messenger.models;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne
    @JoinColumn(name="profile_id")
    private Profile profile;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "profile")
    @Cascade({org.hibernate.annotations.CascadeType.ALL})
    private Set<Profile> friends;


    public Profile() {
    }

    public Profile(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.online = false;
        this.friends = new HashSet<>();
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

    public Set<Profile> getFriends() {
        return friends;
    }

    public void setFriends(Set<Profile> friends) {
        this.friends = friends;
    }

    public void addFriend(Profile friend) {
        this.friends.add(friend);
    }
}

