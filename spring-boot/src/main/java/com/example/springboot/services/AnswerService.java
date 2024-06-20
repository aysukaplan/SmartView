package com.example.springboot.services;

import com.example.springboot.models.Answer;
import com.example.springboot.models.Question;
import com.example.springboot.repositories.AnswerRepository;
import com.example.springboot.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Answer answerQuestion(Long questionId, String content, Long merchantId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Answer answer = new Answer(content, merchantId, question);
        question.setStatus("ANSWERED");
        questionRepository.save(question);

        return answerRepository.save(answer);
    }

    public List<Answer> getAnswersByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }
}
