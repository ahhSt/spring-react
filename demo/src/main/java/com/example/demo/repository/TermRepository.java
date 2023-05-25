package com.example.demo.repository;

import com.example.demo.domain.Domain;
import com.example.demo.domain.Term;
import com.example.demo.dto.DomainDto;
import com.example.demo.dto.QDomainDto;
import com.example.demo.dto.QTermDto;
import com.example.demo.dto.TermDto;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.demo.domain.QDomain.domain;
import static com.example.demo.domain.QTerm.term;

@Slf4j
@Repository
@RequiredArgsConstructor
public class TermRepository {
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;
    public Page<TermDto> search(Pageable pageable) {
        List<TermDto> content = queryFactory
                .select(new QTermDto(
                        term.id.as("termId"),
                        term.korName,
                        term.engName,
                        term.engInitName,
                        term.domains.id.as("domainId"),
                        term.description
                ))
                .from(term)

                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Term> countQuery = queryFactory
                .selectFrom(term)

                ;

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    @Transactional
    public Term insert(Term term){
        em.persist(term);
        return term;
    }

    @Transactional
    public void delete(Term term){
        Term delItem = em.find(Term.class, term.getId());
        em.remove(delItem);
    }
}
