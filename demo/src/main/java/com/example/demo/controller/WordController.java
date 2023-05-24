package com.example.demo.controller;

import com.example.demo.domain.DataType;
import com.example.demo.domain.Domain;
import com.example.demo.domain.Word;
import com.example.demo.dto.DomainDto;
import com.example.demo.dto.WordDto;
import com.example.demo.repository.DomainRepository;
import com.example.demo.repository.WordRepository;
import com.example.demo.service.WordService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/word")
public class WordController {
    private final WordService wordService;

    @GetMapping("/getAll")
    public Page<WordDto> search(Pageable pageable){
        return wordService.search(pageable);
    }

    @Operation(summary = "findMaxId", description = "Max ID")
    @GetMapping("/getMaxId")
    public long getWordMaxId() throws Exception{
        return wordService.getWordMaxId();
    }

    @Operation(summary = "findOne", description = "API to get information about one WordId.")
    @GetMapping("/getOne")
    public List<WordDto> getDomainListById(@RequestParam Long wordId) throws Exception{
        List<Word> fareZones = wordService.findById(wordId);
        List<WordDto> result = fareZones.stream()
                .map(o -> new WordDto(o.getId(), o.getKorName(), o.getEngName(), o.getEngInitName(),
                        o.getDescription()))
                .collect(Collectors.toList());
        return result;
    }

    @PostMapping("")
    public void insert(@RequestBody WordDto wordDto) throws Exception{
        try{
            System.out.println(wordDto.toString());
            Word word = new Word();
            word.setId(wordDto.getId());
            word.setKorName(wordDto.getKorName());
            word.setEngName(wordDto.getEngName());
            word.setEngInitName(wordDto.getEngInitName());
            word.setDescription(wordDto.getDescription());

            wordService.insert(word);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("Insert Error");

        }
    }

    @Operation(summary = "Delete", description = "API to Delete wordId.")
    @DeleteMapping("/{wordId}")
    public void deleteById(@PathVariable Long wordId){
        Word word = new Word();
        word.setId(wordId);
        wordService.deleteById(word);
    }

}
