package com.example.springboot.repositories;

import com.example.springboot.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory(String category, Pageable pageable);
    List<Product> findAllByCategory(String category);
    Page<Product> findByNameContaining(String name, Pageable pageable);
    Page<Product> findByCategoryAndNameContaining(String category, String name, Pageable pageable);
    List<Product> findByMerchantId(long merchantId);

}
