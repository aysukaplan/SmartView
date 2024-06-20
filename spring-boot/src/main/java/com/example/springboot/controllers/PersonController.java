package com.example.springboot.controllers;

import com.example.springboot.models.Person;
import com.example.springboot.repositories.PersonRepository;
import com.example.springboot.repositories.ProductRepository;
import com.example.springboot.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class PersonController {

    private final ProductRepository productRepository;
    private final PersonRepository personRepository;

    @Autowired
    public PersonController(ProductRepository productRepository, PersonRepository personRepository) {
        this.productRepository = productRepository;
        this.personRepository = personRepository;
    }

    @Autowired
    private PersonService personService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam String name,
                                          @RequestParam String username,
                                          @RequestParam String city,
                                          @RequestParam String phoneNumber,
                                          @RequestParam String birthday,
                                          @RequestParam String password,
                                          @RequestParam String email) {
        Optional<Person> existingPerson = Optional.ofNullable(personRepository.findByEmail(email));
        if (existingPerson.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Person already exists");
        } else {
            Person person = new Person(name, username, city, phoneNumber, birthday, password, email);
            if (person.getName() == null || person.getName().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Person name is required");
            } else {
                Person savedPerson = personRepository.save(person);
                return ResponseEntity.status(HttpStatus.CREATED).body(savedPerson);
            }
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Person person = personRepository.findByEmail(email);
        if (person != null) {
            if (person.getPassword().equals(password)) {
                person.setStatus(true);
                personRepository.save(person);

                return ResponseEntity.ok(person);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password Incorrect");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This person does not exist.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestParam String email) {
        Optional<Person> existingPerson = Optional.ofNullable(personRepository.findByEmail(email));
        if (existingPerson.isPresent()) {
            Person person = existingPerson.get();
            person.setStatus(false); // Set status to false on logout
            personRepository.save(person);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String email) {
        Optional<Person> person = Optional.ofNullable(personRepository.findByEmail(email));
        if (person.isPresent()) {
            return ResponseEntity.ok(person.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    @GetMapping("/status")
    public ResponseEntity<?> getUserStatus(@RequestParam String email) {
        Optional<Person> existingPerson = Optional.ofNullable(personRepository.findByEmail(email));
        if (existingPerson.isPresent()) {
            Person person = existingPerson.get();
            return ResponseEntity.ok(person);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam String email) {
        boolean isDeleted = personService.deletePersonByEmail(email);
        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String oldPassword, @RequestParam String newPassword) {
        boolean isReset = personService.resetPassword(email, oldPassword, newPassword);
        if (isReset) {
            return ResponseEntity.ok("Password reset successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid email or password.");
        }
    }

    @GetMapping("/role")
    public ResponseEntity<?> getUserRole(@RequestParam String email) {
        Optional<Integer> role = personService.getUserRoleByEmail(email);
        if (role.isPresent()) {
            return ResponseEntity.ok(role.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @PostMapping("/update-role")
    public ResponseEntity<?> updateUserRole(@RequestParam String email, @RequestParam int newRole) {
        boolean updated = personService.updateUserRole(email, newRole);
        if (updated) {
            return ResponseEntity.ok("Role updated successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

}
