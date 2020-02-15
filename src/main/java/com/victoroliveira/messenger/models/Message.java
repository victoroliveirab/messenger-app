package com.victoroliveira.messenger.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "MESSAGE")
public class Message {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable=false)
    private Profile sourceProfile;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable=false)
    private Profile destinationProfile;

    //@Temporal(TemporalType.DATE)
    @Column(nullable=false)
    private LocalDateTime sendTime;

    public Message() {
    }

    public Message(Profile sourceProfile, Profile destinationProfile) {
        this.sourceProfile = sourceProfile;
        this.destinationProfile = destinationProfile;
        this.sendTime = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Profile getSourceProfile() {
        return sourceProfile;
    }

    public void setSourceProfile(Profile sourceProfile) {
        this.sourceProfile = sourceProfile;
    }

    public Profile getDestinationProfile() {
        return destinationProfile;
    }

    public void setDestinationProfile(Profile destinationProfile) {
        this.destinationProfile = destinationProfile;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }
}
