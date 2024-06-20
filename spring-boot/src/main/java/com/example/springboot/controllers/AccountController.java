package com.example.springboot.controllers;

import com.example.springboot.models.Person;
import com.example.springboot.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {

    @Autowired
    private PersonService personService;

    // View Account
    @GetMapping("/{id}")
    public ResponseEntity<?> viewAccount(@PathVariable long id) {
        Optional<Person> person = personService.getPersonById(id);
        if (person.isPresent()) {
            return ResponseEntity.ok(person.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found.");
        }
    }

    @PostMapping("/update-account")
    public ResponseEntity<?> updateAccount(
            @RequestParam String email,
            @RequestParam(required = false) String newEmail,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String birthday,
            @RequestParam(required = false) String phoneNumber) {
        boolean isUpdated = personService.updateAccount(email, newEmail, username, name, city, birthday, phoneNumber);
        if (isUpdated) {
            return ResponseEntity.ok("Account updated successfully.");
        } else {
            return ResponseEntity.status(400).body("Email already taken or other error.");
        }
    }

    // Delete Account
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable long id) {
        Optional<Person> person = personService.getPersonById(id);
        if (person.isPresent()) {
            personService.deletePerson(id);
            return ResponseEntity.ok().body("Person deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found.");
        }
    }
}
