package com.example.demo.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Word {
    @Id
    @Column(name="WORD_ID", columnDefinition = "varchar(5)")
    private String id;

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
