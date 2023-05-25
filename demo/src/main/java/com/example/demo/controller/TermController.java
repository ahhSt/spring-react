package com.example.demo.controller;

import com.example.demo.domain.Domain;
import com.example.demo.domain.Term;
import com.example.demo.domain.TermWord;
import com.example.demo.domain.Word;
import com.example.demo.dto.DomainDto;
import com.example.demo.dto.TermDto;
import com.example.demo.repository.DomainRepository;
import com.example.demo.repository.TermRepository;
import com.example.demo.repository.TermWordRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/term")
public class TermController {
    private final TermRepository termRepository;
    private final TermWordRepository termWordRepository;

    @GetMapping("")
    public Page<TermDto> search(Pageable pageable){
        return termRepository.search(pageable);
    }

    @PostMapping("")
    public void save(@RequestBody TermDto termDto) throws Exception{
        log.info("term : " + termDto);
        System.out.println("term : " + termDto);
        try{
            Term term = new Term();
            // term.setId(termDto.getId());
            term.setKorName(termDto.getKorName());
            term.setEngName(termDto.getEngName());
            term.setEngInitName(termDto.getEngInitName());
            term.setDescription(termDto.getDescription());
            term.setDomains(termDto.getDomain());

            Term newTerm = termRepository.insert(term);
            System.out.println(term);
            //N:1 외래키 값 설정
            
            termDto.getWords().forEach(word -> {
                TermWord termWord = new TermWord();
                termWord.setWords(word);
                termWord.setTerms(newTerm);

                System.out.println(termWord);

                termWordRepository.insert(termWord);
            });

        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("Insert Error");
        }
    }

    @Operation(summary = "용어 삭제", description = "용어를 삭제합니다.")
    @DeleteMapping("/{id}")
    public Page<TermDto> delete( @Parameter(description = "삭제하려는 Term ID 입니다.") @PathVariable Long id) throws Exception{

        Term term = new Term();
        TermWord termWord = new TermWord();
        term.setId(id);
        termWord.setTerms(term);

        termWordRepository.delete(termWord);
        termRepository.delete(term);
        return null;
    }

}
