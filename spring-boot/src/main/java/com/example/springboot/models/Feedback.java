package com.example.springboot.models;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    // Constructors, getters, and setters
    public Feedback() {}

    public Feedback(String text) {
        this.text = text;
    }

    public Long getId() {
        //Long  id = Long.valueOf(1);
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}