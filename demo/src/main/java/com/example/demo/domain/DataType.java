package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class DataType {
    @Id
    @Column(name="DATA_TYPE_ID", columnDefinition = "varchar(5)")
    private String id;

    @Column(columnDefinition = "varchar(10)")
    private String type;

    @OneToMany(mappedBy = "dataTypes", cascade = CascadeType.ALL)
    private List<Domain> domains;
}
