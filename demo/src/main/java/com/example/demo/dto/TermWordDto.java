package com.example.demo.dto;

import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TermWordDto {
    @NotNull
    private Long id;
    @NotNull
    private String termId;
    @NotNull
    private String wordId;

    @QueryProjection
    public TermWordDto(Long id, String termId, String wordId) {
        this.id = id;
        this.termId = termId;
        this.wordId = wordId;
    }
}
