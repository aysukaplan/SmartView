package com.example.springboot.controllers;

import com.example.springboot.models.Product;
import com.example.springboot.models.Person;
import com.example.springboot.models.Review;
import com.example.springboot.repositories.ProductRepository;
import com.example.springboot.repositories.PersonRepository;
import com.example.springboot.repositories.ReviewRepository;
import com.example.springboot.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;
    private final ProductRepository productRepository;
    private final PersonRepository personRepository;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository, ReviewService reviewService, ProductRepository productRepository, PersonRepository personRepository) {
        this.reviewRepository = reviewRepository;
        this.reviewService = reviewService;
        this.productRepository = productRepository;
        this.personRepository = personRepository;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitReview(@RequestParam Long product_id,
                                               @RequestParam String content,
                                               @RequestParam double stars,
                                               @RequestParam Long personId) {
        Product product = productRepository.findById(product_id).orElse(null);
        Person person = personRepository.findById(personId).orElse(null);

        if (product == null || person == null) {
            return new ResponseEntity<>("Product or person not found", HttpStatus.NOT_FOUND);
        }

        Review review = new Review(content, personId, product);
        reviewRepository.save(review);

        return new ResponseEntity<>("Review submitted successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        if (review.isPresent()) {
            return ResponseEntity.ok(review.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
            return ResponseEntity.ok("Product deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestBody Review review) {
        if (reviewService.getReviewById(id).isPresent()) {
            review.setReview_id(id);  // Ensure ID matches the path parameter
            Review updatedReview = reviewService.updateReview(review);
            return ResponseEntity.ok(updatedReview);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<?> likeReview(@PathVariable Long id) {
        Review likedReview = reviewService.likeReview(id);
        if (likedReview != null) {
            return ResponseEntity.ok(likedReview);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
    }

}
