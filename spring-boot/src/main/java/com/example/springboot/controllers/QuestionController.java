package com.example.springboot.controllers;

import com.example.springboot.models.Question;
import com.example.springboot.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/ask")
    public ResponseEntity<Question> askQuestion(@RequestParam String content, @RequestParam Long userId) {
        Question question = questionService.askQuestion(content, userId);
        return ResponseEntity.ok(question);
    }

    @GetMapping("/unanswered")
    public ResponseEntity<List<Question>> getUnansweredQuestions() {
        List<Question> questions = questionService.getUnansweredQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Question>> getQuestionsByUserId(@PathVariable Long userId) {
        List<Question> questions = questionService.getQuestionsByUserId(userId);
        return ResponseEntity.ok(questions);
    }
}
