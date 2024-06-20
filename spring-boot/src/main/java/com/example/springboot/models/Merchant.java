package com.example.springboot.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "merchant")
public class Merchant {

    @Id
    @GeneratedValue
    private long merchant_id;

    @OneToOne
    @JoinColumn(name = "id")
    private Person person;

    public Merchant(String name, String username, String city, String phoneNumber, String birthday, String password, String email) {
        this.person = new Person(name,username, city, phoneNumber, birthday, password, email);
        this.person.setRole(2);
    }

    public Merchant() {

    }

    public long getAdmin_id() {
        return merchant_id;
    }

    public void setAdmin_id(long admin_id) {
        this.merchant_id = admin_id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
