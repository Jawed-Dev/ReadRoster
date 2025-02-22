package com.readroster.backend.auth;
import java.io.Serial;
import java.io.Serializable;

public class AuthDto implements Serializable  {
    @Serial
    private static final long serialVersionUID = 1L;

    private String email;
    private String firstName;
    private String lastName;

    /*@Override
    public String toString() {
        return "AuthDto{" +
                "email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }*/

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}