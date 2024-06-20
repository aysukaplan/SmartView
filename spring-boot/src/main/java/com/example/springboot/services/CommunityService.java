package com.example.springboot.services;

import com.example.springboot.models.Community;
import com.example.springboot.models.CommunityPost;
import com.example.springboot.models.Person;
import com.example.springboot.repositories.CommunityRepository;
import com.example.springboot.repositories.PersonRepository;
import com.example.springboot.repositories.CommunityPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private CommunityPostRepository communityPostRepository;

    public Community addCommunity(Community community) {
        if (community != null) {
            Community savedCommunity = communityRepository.save(community);
            if (savedCommunity != null) {
                return savedCommunity;
            } else {
                throw new RuntimeException("Failed to save community");
            }
        } else {
            throw new IllegalArgumentException("Community cannot be null");
        }
    }

    public Optional<Community> updateCommunity(Long id, String newCommunityName) {
        Optional<Community> optionalCommunity = communityRepository.findById(id);
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            community.setName(newCommunityName);
            Community updatedCommunity = communityRepository.save(community);
            if (updatedCommunity != null) {
                return Optional.of(updatedCommunity);
            } else {
                return Optional.empty();
            }
        } else {
            return Optional.empty();
        }
    }

    public void deleteCommunity(Long id) {
        Optional<Community> optionalCommunity = communityRepository.findById(id);
        if (optionalCommunity.isPresent()) {
            communityRepository.deleteById(id);
        } else {
            throw new RuntimeException("Community not found with id " + id);
        }
    }

    public Optional<Community> getCommunity(Long communityId) {
        Optional<Community> optionalCommunity = communityRepository.findById(communityId);
        if (optionalCommunity.isPresent()) {
            return optionalCommunity;
        } else {
            return Optional.empty();
        }
    }

    public Optional<List<Person>> getAllCommunityUsers(Long id) {
        Optional<Community> optionalCommunity = communityRepository.findById(id);
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            List<Person> users = community.getUsers();
            if (users != null && !users.isEmpty()) {
                return Optional.of(users);
            } else {
                return Optional.empty();
            }
        } else {
            return Optional.empty();
        }
    }

    public Optional<Person> findUserInCommunityByEmail(Long id, String email) {
        Optional<Community> optionalCommunity = communityRepository.findById(id);
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            List<Person> users = community.getUsers();
            if (users != null && !users.isEmpty()) {
                for (Person user : users) {
                    if (user.getEmail().equals(email)) {
                        return Optional.of(user);
                    }
                }
            }
            return Optional.empty();
        } else {
            return Optional.empty();
        }
    }

    public Optional<Community> addUserToCommunity(Long id, Person person) {
        Optional<Community> optionalCommunity = communityRepository.findById(id);
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            if (community.getUsers().contains(person)) {
                throw new IllegalArgumentException("User already in the community");
            } else {
                community.getUsers().add(person);
                Community updatedCommunity = communityRepository.save(community);
                if (updatedCommunity != null) {
                    return Optional.of(updatedCommunity);
                } else {
                    return Optional.empty();
                }
            }
        } else {
            return Optional.empty();
        }
    }

    public boolean deleteUserFromCommunity(Long id, Long userId) {
        Optional<Community> optionalCommunity = communityRepository.findById(id);
        if (optionalCommunity.isPresent()) {
            Community community = optionalCommunity.get();
            List<Person> users = community.getUsers();
            if (users != null && !users.isEmpty()) {
                boolean userRemoved = users.removeIf(user -> user.getId() == userId);
                if (userRemoved) {
                    communityRepository.save(community);
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }
}
