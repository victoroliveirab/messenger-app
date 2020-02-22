package com.victoroliveira.messenger.repository;

import com.victoroliveira.messenger.models.Message;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySourceProfileAndDestinationProfile(Profile sourceProfile, Profile destinationProfile);
}
