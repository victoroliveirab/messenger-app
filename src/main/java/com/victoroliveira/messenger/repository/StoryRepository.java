package com.victoroliveira.messenger.repository;

import com.victoroliveira.messenger.models.Profile;
import com.victoroliveira.messenger.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {
    List<Story> findAllByProfile(Profile profile);
}
