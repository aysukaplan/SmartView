package com.example.springboot.controllers;

import com.example.springboot.models.Product;
import com.example.springboot.services.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recommendations")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/personalized/{userId}")
    public ResponseEntity<?> getPersonalizedRecommendations(@PathVariable Long userId) {
        List<Product> recommendations = recommendationService.getPersonalizedRecommendations(userId);
        if (!recommendations.isEmpty()) {
            return ResponseEntity.ok(recommendations);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No personalized recommendations found for this user");
        }
    }

    @GetMapping("/{userId}")
    public List<Product> getRecommendations(@PathVariable Long userId) {
        return recommendationService.getPersonalizedRecommendations(userId);
    }
}