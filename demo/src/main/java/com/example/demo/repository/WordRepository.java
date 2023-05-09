package com.example.demo.repository;

import com.example.demo.domain.Domain;
import com.example.demo.domain.Word;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    Optional<Word> findById(Long id);

}
