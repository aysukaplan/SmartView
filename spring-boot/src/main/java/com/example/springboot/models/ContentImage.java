package com.example.springboot.models;
import jakarta.persistence.*;
@Entity
@Table(name = "content_image")
public class ContentImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "content_id", nullable = false)
    private Content content;

    // Constructors, getters, and setters


    public ContentImage() {
    }

    public ContentImage(Long id, String imageUrl, Content content) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }
}