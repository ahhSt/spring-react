package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TermWord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="term_id", referencedColumnName = "term_id")
    private Term terms;

    @ManyToOne
    @JoinColumn(name="word_id", referencedColumnName = "word_id")
    private Word words;


}
