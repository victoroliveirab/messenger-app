package com.victoroliveira.messenger.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.*;

// https://www.baeldung.com/jpa-many-to-many

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

    //@JsonFilter("friendsFilter")
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
    //@JsonIgnoreProperties({"name", "password", "id", "birthday", "email", "friends", "followedBy"})
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "following",
            joinColumns = {@JoinColumn(name="follower_id")},
            inverseJoinColumns = {@JoinColumn(name="user_id")}
    )
    private List<Profile> followedBy = new ArrayList<>();

    //@Transient
    //private final SimpleFilterProvider filterProvider = new SimpleFilterProvider();

    public Profile() {
        //filterProvider.addFilter("friendsFilter", SimpleBeanPropertyFilter.filterOutAllExcept("username"));
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

//    public String getFriends() throws JsonProcessingException {
//        ObjectMapper mapper = new ObjectMapper();
//        mapper.setFilterProvider(filterProvider);
//        return mapper.writeValueAsString(friends);
//    }


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
}

