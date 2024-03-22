package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@IdClass(AuthoritiesPK.class)
public class Authorities {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username")
    private Users username;

    @Id
    @Column(name="authority")
    private String authority;
}
