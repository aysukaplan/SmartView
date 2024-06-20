package com.example.springboot.controllers;

import com.example.springboot.models.Answer;
import com.example.springboot.services.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions/{questionId}/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping
    public ResponseEntity<Answer> answerQuestion(@PathVariable Long questionId, @RequestParam String content, @RequestParam Long merchantId) {
        Answer answer = answerService.answerQuestion(questionId, content, merchantId);
        return ResponseEntity.ok(answer);
    }

    @GetMapping
    public ResponseEntity<List<Answer>> getAnswersByQuestionId(@PathVariable Long questionId) {
        List<Answer> answers = answerService.getAnswersByQuestionId(questionId);
        return ResponseEntity.ok(answers);
    }
}
