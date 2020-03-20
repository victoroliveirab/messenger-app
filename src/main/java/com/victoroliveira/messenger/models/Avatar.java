package com.victoroliveira.messenger.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "avatars")
public class Avatar implements Serializable {

    //todo Try to implement id as profile column
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Lob
    private byte[] image;

    public Avatar() {
    }

    public Avatar(byte[] image) {
        super();
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
