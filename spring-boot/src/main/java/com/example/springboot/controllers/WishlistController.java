package com.example.springboot.controllers;

import com.example.springboot.models.Wishlist;
import com.example.springboot.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.models.Product;
import com.example.springboot.repositories.ProductRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @Autowired
    private ProductRepository productRepository;
    @GetMapping("/user/{userId}")
    public Optional<Wishlist> getWishlistByUserId(@PathVariable Long userId) {
        return wishlistService.getWishlistByUserId(userId);
    }


//    @DeleteMapping("/{userId}/remove")
//    public ResponseEntity<?> removeProductFromWishlist(@PathVariable Long userId, @RequestParam Long productId) {
//        try {
//            Wishlist wishlist = wishlistService.removeProductFromWishlist(userId, productId);
//            return ResponseEntity.ok(wishlist);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }
    @PostMapping("/add")
    public void addProductToWishlist(@RequestParam Long userId, @RequestParam Long productId) {
        wishlistService.addProductToWishlist(userId, productId);
    }
}
