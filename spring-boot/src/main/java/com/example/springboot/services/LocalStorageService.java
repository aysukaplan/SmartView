package com.example.springboot.services;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class LocalStorageService {
    private static final String uploadDirectory = "uploads"; // Directory to store uploaded files

    public static String store(MultipartFile file) throws IOException {
        String fileName = generateFileName(file);
        Path uploadPath = Paths.get(uploadDirectory).toAbsolutePath().normalize();
        Path filePath = uploadPath.resolve(fileName).normalize();
        Files.createDirectories(uploadPath);
        Files.copy(file.getInputStream(), filePath);
        return fileName;
    }

    private static String generateFileName(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        return UUID.randomUUID().toString() + extension;
    }
}

