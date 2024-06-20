package com.example.springboot.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "community_users",
            joinColumns = @JoinColumn(name = "community_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Person> users;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CommunityPost> communityPosts;

    public Community() {
    }

    public Community(String name) {
        this.name = name;
    }

    public Long getCommunityId() {  // Updated getter method name
        return communityId;
    }

    public void setCommunityId(Long communityId) {  // Updated setter method name
        this.communityId = communityId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Person> getUsers() {
        return users;
    }

    public void setUsers(List<Person> users) {
        this.users = users;
    }

    public List<CommunityPost> getCommunityPosts() {
        return communityPosts;
    }

    public void setCommunityPosts(List<CommunityPost> communityPosts) {
        this.communityPosts = communityPosts;
    }
}
