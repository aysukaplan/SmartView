package com.example.springboot.models;

import jakarta.persistence.*;
import org.springframework.security.core.parameters.P;

@Entity
@Table(name = "Review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long review_id;
    @Column
    private String content;

    @Column(name = "person_id")
    private long person_id;

    @Column(name = "likes", nullable = false)
    private int likes = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public Review() {

    }
    public Review(String content, long person_id, Product product) {
        this.content = content;
        this.person_id = person_id;
        this.product = product;
    }

    public String getContent() {
        return content;
    }

    public void setReview_id(Long review_id) {
        this.review_id = review_id;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
