package com.example.springboot.services;

import com.example.springboot.models.Product;
import com.example.springboot.models.Wishlist;
import com.example.springboot.repositories.ProductRepository;
import com.example.springboot.repositories.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springboot.repositories.PersonRepository;
import com.example.springboot.models.Person;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class WishlistService {


    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addProductToWishlist(Long userId, Long productId) {
        System.out.println("Adding product with ID " + productId + " to wishlist for user with ID " + userId);

        Optional<Wishlist> wishlistOpt = wishlistRepository.findByUserId(userId);
        Optional<Person> userOpt = personRepository.findById(userId);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (!userOpt.isPresent()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        if (!productOpt.isPresent()) {
            throw new RuntimeException("Product not found with ID: " + productId);
        }

        Person user = userOpt.get();
        Product product = productOpt.get();

        Wishlist wishlist;
        if (wishlistOpt.isPresent()) {
            wishlist = wishlistOpt.get();
        } else {
            wishlist = new Wishlist(user);
        }

        if (!wishlist.getProducts().contains(product)) {
            wishlist.getProducts().add(product);
            wishlistRepository.save(wishlist);
            System.out.println("Product added to wishlist successfully");
        } else {
            System.out.println("Product already in wishlist");
        }
    }
    public Optional<Wishlist> getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }


//    public Wishlist removeProductFromWishlist(Long userId, Long productId) {
//        Wishlist wishlist = wishlistRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Wishlist not found"));
//        Product product = productRepository.findById(productId).orElseThrow(() -> new IllegalArgumentException("Product not found"));
//        wishlist.getProduct().remove(product);
//        return wishlistRepository.save(wishlist);
//    }
    public void saveWishlist(Wishlist wishlist) {
        wishlistRepository.save(wishlist);
    }
}
