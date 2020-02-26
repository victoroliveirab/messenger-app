package com.victoroliveira.messenger.models;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String confirmationToken;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @OneToOne
    @JoinColumn(nullable = false, name="user_id")
    private Profile profile;

    public ConfirmationToken() {
        createdDate = LocalDateTime.now();
        confirmationToken = UUID.randomUUID().toString();
    }

    public ConfirmationToken(Profile profile) {
        super();
        this.profile = profile;
    }




}
