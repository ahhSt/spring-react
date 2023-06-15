package com.example.demo.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Embeddable
public class MetaTarget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="META_ID")
    private Long id;

    @NotNull
    @Column(name="target_db_name")
    private String db_name;
    @NotNull
    @Column(name="target_db_schema")
    private String schema;
    @NotNull
    @Column(name="target_db_user")
    private String user;  

    @OneToMany(mappedBy = "metaTarget", fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE})
    private List<MetaData> columns;
}
