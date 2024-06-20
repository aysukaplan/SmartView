package com.example.springboot.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue
    private long admin_id;

    @OneToOne
    @JoinColumn(name = "person_id")
    private Person person;

    public Admin(String name,String username, String city, String phoneNumber, String birthday, String password, String email) {
        this.person = new Person(name,username, city, phoneNumber, birthday, password, email);
        this.person.setRole(3);
    }

    public Admin() {

    }

    public long getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(long admin_id) {
        this.admin_id = admin_id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
