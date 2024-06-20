package com.example.springboot.services;

import com.example.springboot.models.Product;
import com.example.springboot.models.Review;
import com.example.springboot.models.Wishlist;
import com.example.springboot.repositories.ProductRepository;
import com.example.springboot.repositories.ReviewRepository;
import com.example.springboot.repositories.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Product> getPersonalizedRecommendations(Long userId) {
        Optional<Wishlist> wishlistOpt = wishlistRepository.findByUserId(userId);

        if (wishlistOpt.isPresent()) {
            Wishlist wishlist = wishlistOpt.get();
            Set<String> categories = new HashSet<>();

            // Collect all categories from the products in the wishlist
            for (Product product : wishlist.getProducts()) {
                categories.add(product.getCategory());
            }

            // Collect products with the most liked reviews from each category
            List<Product> recommendations = new ArrayList<>();
            for (String category : categories) {
                List<Product> productsInCategory = productRepository.findAllByCategory(category);
                Map<Product, Long> productLikesCountMap = new HashMap<>();

                for (Product product : productsInCategory) {
                    List<Review> reviews = reviewRepository.findByProductId(product.getId());
                    long likesCount = reviews.stream()
                            .mapToLong(Review::getLikes)
                            .sum();
                    productLikesCountMap.put(product, likesCount);
                }

                // Sort products by likes count in descending order
                List<Product> sortedProducts = productLikesCountMap.entrySet().stream()
                        .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                        .map(Map.Entry::getKey)
                        .collect(Collectors.toList());

                // Add the top product to recommendations
                if (!sortedProducts.isEmpty()) {
                    recommendations.add(sortedProducts.get(0));
                }
            }

            // Shuffle the list and return up to 5 recommendations
            Collections.shuffle(recommendations);
            return recommendations.stream()
                    .limit(5)
                    .collect(Collectors.toList());
        }

        return Collections.emptyList(); // Return empty list if no wishlist found
    }


}
