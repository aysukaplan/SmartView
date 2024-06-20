package com.example.springboot.models;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.springboot.models.ProductImage;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private double price;

    @Column(name = "merchantId")
    private long merchantId;
    private String coupon;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "product_id")

    private List<ProductImage> images;

    // Constructors, getters, and setters


    public Product(Long product_id, String name, String description, String category, double price, long merchantId, List<Review> reviews, List<ProductImage> images) {
        this.product_id = product_id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.merchantId = merchantId;
        this.reviews = reviews;
        this.images = images;
    }

    public Product(String name, String description, String category,  long merchantId, List<String> images) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.merchantId = merchantId;
        List<ProductImage> images1 = new ArrayList<>();
        for (String imageUrl : images) {
            ProductImage image = new ProductImage(imageUrl);
            images1.add(image);
        }
        this.images = images1;
    }

    public Product() {
    }

    public Product(String name, String description, String category, Long merchantId, List<String> imageUrls) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.merchantId = merchantId;
        this.images = images;
    }

    public Long getId() {
        return product_id;
    }

    public void setId(Long id) {
        this.product_id = id;
    }
    public String getCoupon() {
        return coupon;
    }

    public void setCoupon(String coupon) {
        this.coupon = coupon;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(long merchantId) {
        this.merchantId = merchantId;
    }

    public List<ProductImage> getImages() {
        return images;
    }

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
