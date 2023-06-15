package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MetaData {
    
    @Id
    @JoinColumn(name = "meta_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private MetaTarget metaTarget;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="COL_ID")
    private Long col_id;

    @Column(name="table_name")
    private String table_name;

    @Column(name="column_name")
    private String column_name;
    
    @Column(name="data_type")
    private String data_type;

    @Column(name="length")
    private int character_maximum_length;

    @Column(name="numeric_precision")
    private int numeric_precision;

    @Column(name="numeric_scale")
    private int numeric_scale;

    @Column(name="datetime_precision")
    private int datetime_precision;

    @Column(name="udt_name")
    private String udt_name;
  
}
