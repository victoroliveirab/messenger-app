package com.victoroliveira.messenger.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;

// https://www.baeldung.com/jpa-many-to-many

@Entity
@Table(name = "USERS")
public class Profile implements Serializable {

    //region Attributes Section
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, max = 32)
    @Column(nullable = false)
    private String name;

    @Size(min = 3, max = 16)
    @Column(unique=true, nullable = false)
    private String username;

    @Email
    @Column(unique=true, nullable=false)
    private String email;

    @Column(nullable=false) //temp
    private LocalDate birthday;

    @Column(nullable=false)
    private String password;

    @Column(nullable = false)
    private boolean online;

    @JsonIgnore
    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name = "following",
            joinColumns = {@JoinColumn(name="user_id")},
            inverseJoinColumns = {@JoinColumn(name="follower_id")}
    )
    private List<Profile> friends = new ArrayList<>();

    //https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion
    //http://springquay.blogspot.com/2016/01/new-approach-to-solve-json-recursive.html
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "following",
            joinColumns = {@JoinColumn(name="follower_id")},
            inverseJoinColumns = {@JoinColumn(name="user_id")}
    )
    private List<Profile> followedBy = new ArrayList<>();
    //endregion

    public Profile() {
    }

    //region Regular Getters and Setters
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
        this.username = username.toLowerCase();
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
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
        this.email = email.toLowerCase();
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }
    //endregion

    //region Getters and Setters of Friends and Followers
    public List<Profile> getFriends() {
        return friends;
    }

    public List<String> getFriendsUsernames() {
        List<String> friends = new ArrayList<>();
        for (Profile friend : this.getFriends()) {
            friends.add(friend.getUsername());
        }
        return friends;
    }

    public void setFriends(List<Profile> friends) {
        this.friends = friends;
    }

    public void addFriend(Profile friend) {
        this.friends.add(friend);
    }

    public void removeFriend(Profile friend) {
        this.friends.remove(friend);
    }

    public List<Profile> getFollowedBy() {
        return followedBy;
    }

    public List<String> getFollowersUsernames() {
        List<String> followedBy = new ArrayList<>();
        for (Profile follower : this.getFollowedBy()) {
            followedBy.add(follower.getUsername());
        }
        return followedBy;
    }

    public void setFollowedBy(List<Profile> followedBy) {
        this.followedBy = followedBy;
    }

    public void addFollowedBy(Profile follower) {
        this.followedBy.add(follower);
    }
    //endregion

}

