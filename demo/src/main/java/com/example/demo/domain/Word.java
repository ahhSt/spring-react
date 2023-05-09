package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Word {
    @Id
    @Column(name="WORD_ID")
    private Long id;

    @Column(columnDefinition = "varchar(20)")
    private String korName;

    @Column(columnDefinition = "varchar(30)")
    private String engName;

    @Column(columnDefinition = "varchar(20)")
    private String engInitName;

    @Column(columnDefinition = "varchar(100)")
    private String description;

    @OneToMany(mappedBy = "words")
    private List<TermWord> wordsTerms = new ArrayList<>();
}
