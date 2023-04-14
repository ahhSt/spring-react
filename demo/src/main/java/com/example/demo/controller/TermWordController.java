package com.example.demo.controller;

import com.example.demo.dto.DomainDto;
import com.example.demo.dto.TermWordDto;
import com.example.demo.repository.DomainRepository;
import com.example.demo.repository.TermWordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/termWord")
public class TermWordController {
    private final TermWordRepository termWordRepository;

    @GetMapping("/getAll")
    public Page<TermWordDto> search(Pageable pageable){
        return termWordRepository.search(pageable);
    }
}
