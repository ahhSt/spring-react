package com.example.demo.repository;

import com.example.demo.domain.Domain;
import com.example.demo.domain.TermWord;
import com.example.demo.dto.DomainDto;
import com.example.demo.dto.QDomainDto;
import com.example.demo.dto.QTermWordDto;
import com.example.demo.dto.TermWordDto;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.demo.domain.QTermWord.termWord;

@Slf4j
@Repository
@RequiredArgsConstructor
public class TermWordRepository {
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    public Page<TermWordDto> search(Pageable pageable) {
        List<TermWordDto> content = queryFactory
                .select(new QTermWordDto(
                        termWord.id,
                        termWord.terms.id.as("termId"),
                        termWord.words.id.as("wordId")
                ))
                .from(termWord)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<TermWord> countQuery = queryFactory
                .selectFrom(termWord)
                ;

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }
}
