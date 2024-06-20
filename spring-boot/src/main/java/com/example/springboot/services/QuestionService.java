package com.example.springboot.services;

import com.example.springboot.models.Question;
import com.example.springboot.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question askQuestion(String content, Long userId) {
        Question question = new Question(content, userId);
        return questionRepository.save(question);
    }

    public List<Question> getUnansweredQuestions() {
        return questionRepository.findByStatus("UNANSWERED");
    }

    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public List<Question> getQuestionsByUserId(Long userId) {
        return questionRepository.findByUserId(userId);
    }
}
