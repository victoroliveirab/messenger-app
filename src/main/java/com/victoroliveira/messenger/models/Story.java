package com.victoroliveira.messenger.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="stories")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY, optional = false)
    @JoinColumn(nullable = false)
    private Profile profile;

    @Column(nullable = false)
    private LocalDateTime postTime;

    @Column(nullable = false)
    private String text;

    @Column
    private boolean onlyBestFriends;

    @Column
    private byte[] backgroundImage;

    @Column
    private String gradient;

    @Column
    private boolean whiteFont;

    public Story() {
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

    public LocalDateTime getPostTime() {
        return postTime;
    }

    public void setPostTime(LocalDateTime postTime) {
        this.postTime = postTime;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isOnlyBestFriends() {
        return onlyBestFriends;
    }

    public void setOnlyBestFriends(boolean onlyBestFriends) {
        this.onlyBestFriends = onlyBestFriends;
    }

    public byte[] getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(byte[] backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public String getGradient() {
        return gradient;
    }

    public void setGradient(String gradient) {
        this.gradient = gradient;
    }

    public boolean isWhiteFont() {
        return whiteFont;
    }

    public void setWhiteFont(boolean whiteFont) {
        this.whiteFont = whiteFont;
    }
}
