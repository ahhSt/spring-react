package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Domain {
    @Id
    @Column(name="DOMAIN_ID", columnDefinition = "varchar(5)")
    private String id;

    @Column(columnDefinition = "varchar(20)")
    private String korName;

    @Column(columnDefinition = "varchar(30)")
    private String engName;

    @Column(columnDefinition = "varchar(20)")
    private String engInitName;

    @Column(columnDefinition = "varchar(5)")
    private String length;

    @Column(columnDefinition = "varchar(100)")
    private String description;

//	@Embedded
//	private Address address;

//	@JsonIgnore
//	@OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
//	private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Term> terms;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "data_type_id", referencedColumnName = "data_type_id")
    private DataType dataTypes;
}
