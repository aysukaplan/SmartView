package com.example.springboot.repositories;

import com.example.springboot.models.Community;
import com.example.springboot.models.CommunityPost;
import com.example.springboot.models.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {

}
