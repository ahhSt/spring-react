package com.example.demo.controller;

import com.example.demo.domain.DataType;
import com.example.demo.domain.Domain;
import com.example.demo.domain.Word;
import com.example.demo.dto.DomainDto;
import com.example.demo.dto.WordDto;
import com.example.demo.repository.DomainRepository;
import com.example.demo.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/word")
public class WordController {
    private final WordRepository wordRepository;

    @GetMapping("/getAll")
    public Page<WordDto> search(Pageable pageable){
        return wordRepository.search(pageable);
    }

    @PostMapping("/insert")
    public void insert(@RequestBody WordDto wordDto) throws Exception{
        try{
            System.out.println(wordDto.toString());
            Word word = new Word();
            word.setId(wordDto.getId());
            word.setKorName(wordDto.getKorName());
            word.setEngName(wordDto.getEngName());
            word.setEngInitName(wordDto.getEngInitName());
            word.setDescription(wordDto.getDescription());

            wordRepository.insert(word);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("Insert Error");

        }
    }

    @DeleteMapping("/{wordId}")
    public void deleteDomainId (@PathVariable String wordId) throws Exception{
        try {
//            Domain domain = domainRepository.findById(doaminId)
//                    .orElseThrow(IllegalArgumentException::new);
            wordRepository.delete(wordId);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("Delete Error");
        }
    }

}
