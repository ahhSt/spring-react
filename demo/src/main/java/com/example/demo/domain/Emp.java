package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Emp {
    @Id
    @Column(name="dept_no")
    private Long empno;
    private String ename;
    private String job;
    private String mgr;
    private Date hiredate;
    private Long sal;
    private Long comm;
    @ManyToOne
    private Dept deptno;
}
