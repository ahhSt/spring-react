package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TERM_SEQ")
    @SequenceGenerator(sequenceName = "term_seq", allocationSize = 1, name = "TERM_SEQ")
    @Column(name="TERM_ID")
    private Long id;

    @Column(columnDefinition = "varchar(20)")
    private String korName;

    @Column(columnDefinition = "varchar(30)")
    private String engName;

    @Column(columnDefinition = "varchar(20)")
    private String engInitName;

    @Column(columnDefinition = "varchar(100)")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "domain_id", referencedColumnName = "domain_id")
    private Domain domains;

    @OneToMany(mappedBy = "terms")
    private List<TermWord> termsWords = new ArrayList<>();

}
