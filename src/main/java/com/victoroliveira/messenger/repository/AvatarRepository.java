package com.victoroliveira.messenger.repository;

import com.victoroliveira.messenger.models.Avatar;
import com.victoroliveira.messenger.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
    Avatar findByProfile(Profile profile);
}
