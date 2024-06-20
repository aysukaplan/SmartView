package com.example.springboot.controllers;

import com.example.springboot.models.Bookmark;
import com.example.springboot.services.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookmarks")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;

    @PostMapping("/add")
    public ResponseEntity<?> addBookmark(@RequestParam Long userId, @RequestParam Long productId) {
        bookmarkService.addBookmark(userId, productId);
        return ResponseEntity.ok("Bookmark added successfully");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeBookmark(@RequestParam Long userId, @RequestParam Long productId) {
        bookmarkService.removeBookmark(userId, productId);
        return ResponseEntity.ok("Bookmark removed successfully");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Bookmark>> getUserBookmarks(@PathVariable Long userId) {
        List<Bookmark> bookmarks = bookmarkService.getUserBookmarks(userId);
        return ResponseEntity.ok(bookmarks);
    }
}
