package com.example.demo.service;

import com.example.demo.domain.Domain;
import com.example.demo.domain.Word;
import com.example.demo.dto.QWordDto;
import com.example.demo.dto.WordDto;
import com.example.demo.repository.WordRepository;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.example.demo.domain.QDomain.domain;
import static com.example.demo.domain.QWord.word;

@Slf4j
@Service
@RequiredArgsConstructor
public class WordService {
    private final WordRepository wordRepository;
    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Transactional(readOnly = true)
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
                .fetch()
                ;

        JPAQuery<Word> countQuery = queryFactory
                .selectFrom(word)
                ;

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    @Transactional(readOnly = true)
    public long getWordMaxId(){
        long maxId = queryFactory.
                select(word.id.max())
                .from(word)
                .fetchOne();
        return maxId;
    }

    @Transactional(readOnly = true)
    public Word findOne(Long wordId) {
        return em.find(Word.class, wordId);
    }

    @Transactional(readOnly = true)
    public List<Word> findById(Long wordId) {
        return em.createQuery("select f from Word f where f.id = :wordId", Word.class)
                .setParameter("wordId", wordId)
                .getResultList();
    }

    @Transactional
    public void insert(Word word) {
        em.persist(word);
    }

    @Transactional
    public void delete(Word word) {
        em.remove(word);
    }

    private void validateExistWord(Word word) {
        Optional<Word> findWord = wordRepository.findById(word.getId());
        if (findWord.isEmpty()) {
            throw new IllegalStateException("존재하지 않는 Word ID 입니다. 삭제할 수 없습니다.");
        }
        else {
            System.out.println("삭제완료");
        }
    }
    @Transactional
    public void deleteById(Word word) {
        validateExistWord(word); // 존재하는 domain id 인지 검증
        Word word1 = findOne(word.getId());
        em.remove(word1);
    }


}
