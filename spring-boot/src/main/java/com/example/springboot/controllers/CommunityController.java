package com.example.springboot.controllers;

import com.example.springboot.models.Community;
import com.example.springboot.models.Person;
import com.example.springboot.services.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.repositories.PersonRepository;
import com.example.springboot.services.PersonService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    public PersonRepository personRepository;

    @Autowired
    public PersonService personService;

    @PostMapping("/add")
    public ResponseEntity<Community> addCommunity(@RequestParam String name) {
        // Create a new Community object with the provided name
        Community newCommunity = new Community(name);

        // Save the new Community object using the communityService
        Community savedCommunity = communityService.addCommunity(newCommunity);

        // Return the saved Community object with a status code 200 (OK)
        return ResponseEntity.ok(savedCommunity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunity(@PathVariable Long id, @RequestParam String newCommunityName) {
        // Try to update the Community object with the given ID using the provided details
        Optional<Community> updatedCommunity = communityService.updateCommunity(id, newCommunityName);

        // If the Community object was updated successfully, return it with status code 200 (OK)
        // If not, return status code 404 (Not Found)
        return updatedCommunity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable Long id) {
        // Attempt to delete the Community object with the given ID
        communityService.deleteCommunity(id);

        // Regardless of the outcome, return status code 204 (No Content) indicating the action was performed
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunity(@PathVariable Long id) {
        // Try to retrieve the Community object with the given ID
        Optional<Community> community = communityService.getCommunity(id);

        // If the Community object was found, return it with status code 200 (OK)
        // If not, return status code 404 (Not Found)
        return community.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<List<Person>> getAllCommunityUsers(@PathVariable Long id) {
        // Try to retrieve all users associated with the Community object with the given ID
        Optional<List<Person>> users = communityService.getAllCommunityUsers(id);

        // If users were found, return them with status code 200 (OK)
        // If not, return status code 404 (Not Found)
        return users.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/users/{email}")
    public ResponseEntity<Person> findUserInCommunityByEmail(@PathVariable Long id, @PathVariable String email) {
        // Try to find a user by email within the Community object with the given ID
        Optional<Person> user = communityService.findUserInCommunityByEmail(id, email);

        // If the user was found, return the user with status code 200 (OK)
        // If not, return status code 404 (Not Found)
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/users")
    public ResponseEntity<Community> addUserToCommunity(@PathVariable Long id, @RequestParam long personId) {
        Optional<Person> thisPerson = this.personService.getPersonById(personId);
        // Try to add the provided Person object to the Community object with the given ID
        Optional<Community> updatedCommunity = communityService.addUserToCommunity(id, thisPerson.orElse(null));

        // If the user was added successfully, return the updated Community object with status code 200 (OK)
        // If not, return status code 404 (Not Found)
        return updatedCommunity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}/users/{userId}")
    public ResponseEntity<Void> deleteUserFromCommunity(@PathVariable Long id, @PathVariable Long userId) {
        // Try to delete the user with the given userId from the Community object with the given ID
        boolean isDeleted = communityService.deleteUserFromCommunity(id, userId);

        // If the user was deleted successfully, return status code 204 (No Content)
        // If not, return status code 404 (Not Found)
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Community>> getAllCommunities() {
        // Retrieve all communities from the database using the communityService
        List<Community> communities = communityService.getAllCommunities();

        // Return the list of communities with a status code 200 (OK)
        return ResponseEntity.ok(communities);
    }
}
