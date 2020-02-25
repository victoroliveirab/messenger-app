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

    @Size(min = 3, max = 64)
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

    @Column
    private boolean online = false;

    @JsonIgnore
    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name = "contacts",
            joinColumns = {@JoinColumn(name="owner_id")},
            inverseJoinColumns = {@JoinColumn(name="contact_id")}
    )
    private List<Profile> contacts = new ArrayList<>();

    //https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion
    //http://springquay.blogspot.com/2016/01/new-approach-to-solve-json-recursive.html
    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "contacts",
            joinColumns = {@JoinColumn(name="contact_id")},
            inverseJoinColumns = {@JoinColumn(name="owner_id")}
    )
    private List<Profile> contactOf = new ArrayList<>();

    @Column
    private boolean confirmed = false;
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

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    //endregion

    //region Getters and Setters of Friends and Followers
    public List<Profile> getContacts() {
        return contacts;
    }

    public List<String> getContactsUsernames() {
        List<String> contacts = new ArrayList<>();
        for (Profile contact : this.getContacts()) {
            contacts.add(contact.getUsername());
        }
        return contacts;
    }

    public void setContacts(List<Profile> contacts) {
        this.contacts = contacts;
    }

    public void addContact(Profile contact) {
        this.contacts.add(contact);
    }

    public void removeContact(Profile contact) {
        this.contacts.remove(contact);
    }

    public List<Profile> getContactOf() {
        return contactOf;
    }

    public List<String> getContactOfUsernames() {
        List<String> contactsOf = new ArrayList<>();
        for (Profile follower : this.getContactOf()) {
            contactsOf.add(follower.getUsername());
        }
        return contactsOf;
    }

    public void setContactOf(List<Profile> contactOf) {
        this.contactOf = contactOf;
    }

    public void addContactOf(Profile owner) {
        this.contactOf.add(owner);
    }
    //endregion

}

