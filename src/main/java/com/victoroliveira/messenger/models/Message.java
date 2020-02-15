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
    private UserModel sourceUserModel;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(nullable=false)
    private UserModel destinationUserModel;

    //@Temporal(TemporalType.DATE)
    @Column(nullable=false)
    private LocalDateTime sendTime;

    public Message() {
    }

    public Message(UserModel sourceUserModel, UserModel destinationUserModel) {
        this.sourceUserModel = sourceUserModel;
        this.destinationUserModel = destinationUserModel;
        this.sendTime = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserModel getSourceUserModel() {
        return sourceUserModel;
    }

    public void setSourceUserModel(UserModel sourceUserModel) {
        this.sourceUserModel = sourceUserModel;
    }

    public UserModel getDestinationUserModel() {
        return destinationUserModel;
    }

    public void setDestinationUserModel(UserModel destinationUserModel) {
        this.destinationUserModel = destinationUserModel;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }
}
