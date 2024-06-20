package com.example.springboot.repositories;

import com.example.springboot.models.Community;
import com.example.springboot.models.CommunityPost;
import com.example.springboot.models.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long>  {
    Community findByCommunityId(Long community_id);

    Community save(Community community);

    Optional<Community> findById(Long id);

    void deleteById(Long id);
}
