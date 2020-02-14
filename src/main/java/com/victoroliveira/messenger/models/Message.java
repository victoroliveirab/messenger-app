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
    private User sourceUser;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable=false)
    private User destinationUser;

    //@Temporal(TemporalType.DATE)
    @Column(nullable=false)
    private LocalDateTime sendTime;

    public Message() {
    }

    public Message(User sourceUser, User destinationUser) {
        this.sourceUser = sourceUser;
        this.destinationUser = destinationUser;
        this.sendTime = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getSourceUser() {
        return sourceUser;
    }

    public void setSourceUser(User sourceUser) {
        this.sourceUser = sourceUser;
    }

    public User getDestinationUser() {
        return destinationUser;
    }

    public void setDestinationUser(User destinationUser) {
        this.destinationUser = destinationUser;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }
}
