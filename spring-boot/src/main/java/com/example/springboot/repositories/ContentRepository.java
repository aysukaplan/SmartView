package com.example.springboot.repositories;
import com.example.springboot.models.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    // Add custom query methods if needed
}