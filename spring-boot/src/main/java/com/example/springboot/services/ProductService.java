package com.example.springboot.services;

import com.example.springboot.models.Product;
import com.example.springboot.repositories.ProductRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getSortedProducts(){
        List<Product> products = productRepository.findAll();
        Collections.sort(products, Comparator.comparing(Product::getName));
        return products;
    }

    public Page<Product> browseAndSearchProducts(int page, int size, String category, String name) {
        Pageable pageable = PageRequest.of(page, size);
        if (category != null && name != null) {
            return productRepository.findByCategoryAndNameContaining(category, name, pageable);
        } else if (category != null) {
            return productRepository.findByCategory(category, pageable);
        } else if (name != null) {
            return productRepository.findByNameContaining(name, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }
    public byte[] generateQRCodeImage(String text, int width, int height) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        return pngOutputStream.toByteArray();
    }

    public String generateShareableLink(Long productId) {
        // Generate the shareable link or content
        // This is just an example link, replace it with your actual application link
        return "https://localhost/3000/products/" + productId;
    }

    public List<Product> getProductsByMerchantId(long merchantId) {
        return productRepository.findByMerchantId(merchantId);
    }
    public void addCouponToProduct(Long productId, String coupon) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            product.setCoupon(coupon);
            productRepository.save(product);
        } else {
            throw new RuntimeException("Product not found");
        }
    }
}
