package com.example.springboot.repositories;

import com.example.springboot.models.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByStatus(String status);
    List<Question> findByUserId(Long userId);
}
