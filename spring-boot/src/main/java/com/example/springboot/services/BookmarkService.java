package com.example.springboot.services;

import com.example.springboot.models.Bookmark;
import com.example.springboot.repositories.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    public void addBookmark(Long userId, Long productId) {
        Optional<Bookmark> existingBookmark = bookmarkRepository.findByUserIdAndProductId(userId, productId);
        if (existingBookmark.isEmpty()) {
            Bookmark bookmark = new Bookmark(userId, productId);
            bookmarkRepository.save(bookmark);
        }
    }

    public void removeBookmark(Long userId, Long productId) {
        Optional<Bookmark> bookmark = bookmarkRepository.findByUserIdAndProductId(userId, productId);
        bookmark.ifPresent(value -> bookmarkRepository.delete(value));
    }

    public List<Bookmark> getUserBookmarks(Long userId) {
        return bookmarkRepository.findByUserId(userId);
    }
}
