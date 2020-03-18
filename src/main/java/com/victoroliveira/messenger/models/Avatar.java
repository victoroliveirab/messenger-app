package com.victoroliveira.messenger.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "avatars")
public class Avatar implements Serializable {
    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @Column
    private byte[] image;

    public Avatar() {
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
