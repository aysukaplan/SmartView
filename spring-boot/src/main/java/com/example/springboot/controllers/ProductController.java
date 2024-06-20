package com.example.springboot.controllers;

import com.example.springboot.models.Product;
import com.example.springboot.repositories.ProductRepository;
import com.example.springboot.services.ProductService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import com.example.springboot.services.LocalStorageService;
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductService productService;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> createProduct(@RequestParam("name") String name,
                                           @RequestParam("description") String description,
                                           @RequestParam("category") String category,
                                           @RequestParam("merchant_id") Long merchantId,
                                           @RequestParam("images") MultipartFile[] images) {
        try {
            // Validate required fields
            if (StringUtils.isEmpty(name) || StringUtils.isEmpty(description) || StringUtils.isEmpty(category)) {
                return ResponseEntity.badRequest().body("Name, description, and category are required");
            }

            // Handle file uploads
            List<String> imageUrls = Arrays.stream(images)
                    .map(image -> {
                        try {
                            return LocalStorageService.store(image);
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .collect(Collectors.toList());

            // Create product object
            Product product = new Product(name, description, category, merchantId, imageUrls);

            // Save product
            Product savedProduct = productService.addProduct(product);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving product");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        if (productRepository.existsById(id)) {
            product.setId(id);  // Ensure ID matches the path parameter
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok("Product deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllProduct() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/getSortedProducts")
    public ResponseEntity<List<Product>> getSortedProducts() {
        List<Product> products = productService.getSortedProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/browse")
    public ResponseEntity<Page<Product>> browseAndSearchProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String name) {
        Page<Product> products = productService.browseAndSearchProducts(page, size, category, name);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}/share")
    public ResponseEntity<String> shareProduct(@PathVariable Long id) {
        String shareableLink = productService.generateShareableLink(id);
        return ResponseEntity.ok(shareableLink);
    }

    @GetMapping("/{id}/qrcode")
    public ResponseEntity<byte[]> getProductQRCode(@PathVariable Long id) {
        String shareableLink = productService.generateShareableLink(id);
        try {
            byte[] qrCode = productService.generateQRCodeImage(shareableLink, 350, 350);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity<>(qrCode, headers, HttpStatus.OK);
        } catch (WriterException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/merchant/{merchantId}")
    public ResponseEntity<List<Product>> getProductsByMerchantId(@PathVariable long merchantId) {
        List<Product> products = productService.getProductsByMerchantId(merchantId);
        if (products != null) {
            return ResponseEntity.ok(products);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("/{productId}/coupon")
    public ResponseEntity<String> addCouponToProduct(@PathVariable Long productId, @RequestBody Map<String, String> request) {
        String coupon = request.get("coupon");
        productService.addCouponToProduct(productId, coupon);
        return ResponseEntity.ok("Coupon added successfully");
    }
}
