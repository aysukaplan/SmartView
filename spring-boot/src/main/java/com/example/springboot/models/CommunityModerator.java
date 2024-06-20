package com.example.springboot.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "moderator")
public class CommunityModerator {

    @Id
    @GeneratedValue
    private long moderator_id;

    @OneToOne
    @JoinColumn(name = "person_id")
    private Person person;

    public CommunityModerator(String name, String username, String city, String phoneNumber, String birthday, String password, String email) {
        this.person = new Person(name,username, city, phoneNumber, birthday, password, email);
        this.person.setRole(4);
    }

    public CommunityModerator() {

    }

    public long getAdmin_id() {
        return moderator_id;
    }

    public void setAdmin_id(long admin_id) {
        this.moderator_id = admin_id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
