package com.example.demo.controller;

import com.example.demo.dto.DomainDto;
import com.example.demo.dto.TermDto;
import com.example.demo.repository.DomainRepository;
import com.example.demo.repository.TermRepository;
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
@RequestMapping("/api/term")
public class TermController {
    private final TermRepository termRepository;

    @GetMapping("/getAll")
    public Page<TermDto> search(Pageable pageable){
        return termRepository.search(pageable);
    }


}
