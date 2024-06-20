package com.example.springboot.services;

import com.example.springboot.models.Person;
import com.example.springboot.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

    public Optional<Person> getPersonById(long id) {
        return personRepository.findById(id);
    }

    public Person updatePerson(long id, Person person) {
        Optional<Person> existingPerson = personRepository.findById(id);
        if (existingPerson.isPresent()) {
            Person updatedPerson = existingPerson.get();
            updatedPerson.setUsername(person.getUsername());
            updatedPerson.setEmail(person.getEmail());
            updatedPerson.setName(person.getName());
            updatedPerson.setCity(person.getCity());
            updatedPerson.setPhoneNumber(person.getPhoneNumber());
            updatedPerson.setBirthday(person.getBirthday());
            if (person.getPassword() != null && !person.getPassword().isEmpty()) {
                updatedPerson.setPassword(person.getPassword());
            }
            return personRepository.save(updatedPerson);
        } else {
            return null;
        }
    }

    public void deletePerson(long id) {
        personRepository.deleteById(id);
    }

    public boolean resetPassword(String email, String oldPassword, String newPassword) {
        Optional<Person> personOptional = Optional.ofNullable(personRepository.findByEmail(email));
        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            if (person.getPassword().equals(oldPassword)) {
                person.setPassword(newPassword);
                personRepository.save(person);
                return true;
            }
        }
        return false;
    }


    public void logout(String email) {
        Optional<Person> existingPerson = Optional.ofNullable(personRepository.findByEmail(email));
        if (existingPerson.isPresent()) {
            Person person = existingPerson.get();
            person.setStatus(false); // Set status to false on logout
            personRepository.save(person);
        }
    }
    public boolean deletePersonByEmail(String email) {
        Optional<Person> personOptional = Optional.ofNullable(personRepository.findByEmail(email));
        if (personOptional.isPresent()) {
            personRepository.delete(personOptional.get());
            return true;
        }
        return false;
    }

        public boolean updateAccount(String email, String newEmail, String username, String name, String city, String birthday, String phoneNumber) {
        Optional<Person> personOptional = Optional.ofNullable(personRepository.findByEmail(email));
        if (personOptional.isPresent()) {
            Person person = personOptional.get();

            if (newEmail != null && !newEmail.isEmpty() && !newEmail.equals(email)) {
                // Check if new email already exists
                Optional<Person> newEmailPersonOptional = Optional.ofNullable(personRepository.findByEmail(newEmail));
                if (newEmailPersonOptional.isPresent()) {
                    return false; // New email already taken
                } else {
                    person.setEmail(newEmail);
                }
            }

            if (username != null && !username.isEmpty()) person.setUsername(username);
            if (name != null && !name.isEmpty()) person.setName(name);
            if (city != null && !city.isEmpty()) person.setCity(city);
            if (birthday != null && !birthday.isEmpty()) person.setBirthday(birthday);
            if (phoneNumber != null && !phoneNumber.isEmpty()) person.setPhoneNumber(phoneNumber);

            personRepository.save(person);
            return true;
        }
        return false;
    }

    public Optional<Integer> getUserRoleByEmail(String email) {
        Optional<Person> personOptional = Optional.ofNullable(personRepository.findByEmail(email));
        return personOptional.map(Person::getRole);
    }

    public boolean updateUserRole(String email, int newRole) {
        Optional<Person> personOptional = Optional.ofNullable(personRepository.findByEmail(email));
        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            person.setRole(newRole);
            personRepository.save(person);
            return true;
        }
        return false;
    }

}
