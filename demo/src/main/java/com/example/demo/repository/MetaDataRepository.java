package com.example.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.MetaData;
import com.example.demo.domain.MetaTarget;
import com.example.demo.domain.QMetaTarget;
import com.example.demo.domain.Term;
import com.example.demo.dto.QTermDto;
import com.example.demo.dto.TermDto;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MetaDataRepository {
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Transactional
    public MetaData insert(MetaData metaData){
        em.persist(metaData);
        return metaData;
    }

    @Transactional
    public void delete(MetaData metaData){
        MetaData delItem = em.find(MetaData.class, metaData.getCol_id());
        em.remove(delItem);
    }
}
