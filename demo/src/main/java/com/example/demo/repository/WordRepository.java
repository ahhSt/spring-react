package com.example.demo.repository;

import com.example.demo.domain.Domain;
import com.example.demo.domain.Word;
import com.example.demo.dto.DomainDto;
import com.example.demo.dto.QDomainDto;
import com.example.demo.dto.QWordDto;
import com.example.demo.dto.WordDto;
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
import static com.example.demo.domain.QWord.word;

@Slf4j
@Repository
@RequiredArgsConstructor
public class WordRepository {
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    public Page<WordDto> search(Pageable pageable) {
        List<WordDto> content = queryFactory
                .select(new QWordDto(
                        word.id.as("wordId"),
                        word.korName,
                        word.engName,
                        word.engInitName,
                        word.description
                ))
                .from(word)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Word> countQuery = queryFactory
                .selectFrom(word)
                ;

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    @Transactional
    public void insert(Word word){
        em.persist(word);
    }

    @Transactional
    public void delete(String wordId) {

        queryFactory.delete(word)
                .where(word.id.eq(wordId))
                .execute();
        em.flush();
        em.clear();
    }

}
