package com.example.springboot.repositories;

import com.example.springboot.models.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByMerchantId(Long merchantId);
    List<Answer> findByQuestionId(Long questionId);
}
