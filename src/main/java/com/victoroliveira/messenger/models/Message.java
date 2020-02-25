package com.victoroliveira.messenger.models;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable=false)
    private Profile sourceProfile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable=false)
    private Profile destinationProfile;

    //@Temporal(TemporalType.DATE)
    @Column(nullable=false)
    private LocalDateTime sendTime;

    @Size(min = 1, max = 2048)
    @Column(nullable = false)
    private String message;

    public Message() {
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
