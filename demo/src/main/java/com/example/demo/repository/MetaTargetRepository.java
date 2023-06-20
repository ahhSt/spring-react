package com.example.demo.repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;

import com.example.demo.domain.MetaData;
import com.example.demo.domain.MetaTarget;
import com.example.demo.domain.QMetaTarget;
import com.example.demo.domain.Term;
import com.example.demo.domain.Word;
import com.example.demo.dto.DbmsDto;
import com.example.demo.dto.TermDto;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;


import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import static com.example.demo.domain.QMetaTarget.metaTarget;

@Slf4j
@Repository
@RequiredArgsConstructor
public class MetaTargetRepository{
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    public List<MetaTarget> search(DbmsDto dbmsDto) {
      
        return queryFactory
                .selectFrom(metaTarget)
                .where(
                  metaTarget.db_name.eq(dbmsDto.getDbname()),
                  metaTarget.schema.eq(dbmsDto.getSchema()),
                  metaTarget.user.eq(dbmsDto.getUser())
                )
                .fetch();
    }

    @Transactional
    public MetaTarget insert(MetaTarget metaTarget){
        em.persist(metaTarget);
        return metaTarget;
    }

    @Transactional
    public void delete(MetaTarget metaTarget){
        MetaTarget delItem = em.find(MetaTarget.class, metaTarget.getId());
        em.remove(delItem);
    }

}
