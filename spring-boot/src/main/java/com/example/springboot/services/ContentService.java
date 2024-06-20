package com.example.springboot.services;
import com.example.springboot.repositories.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springboot.models.Content;

import java.util.List;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    public Content getContentById(Long id){
        try {
            return contentRepository.findById(id)
                    .orElseThrow(() -> new Exception("Content not found with id: " + id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Content createContent(Content content) {
        // Add logic to handle image uploads and associate them with the content
        // Save content entity to the database
        return contentRepository.save(content);
    }

    public Content updateContent(Long id, Content updatedContent) {
        // Validate if content with given id exists
        Content existingContent = getContentById(id);

        // Update existingContent with data from updatedContent
        existingContent.setText(updatedContent.getText());
        existingContent.setCaption(updatedContent.getCaption());
        existingContent.setImages(updatedContent.getImages());

        return contentRepository.save(existingContent);
    }

    public void deleteContent(Long id) {
        // Validate if content with given id exists
        Content existingContent = getContentById(id);

        // Delete content
        contentRepository.delete(existingContent);
    }
}
