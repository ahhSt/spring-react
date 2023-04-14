package com.example.demo.dto;

import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WordDto {
    @NotNull
    private String id;
    private String korName;
    private String engName;
    private String engInitName;
    private String description;

    @QueryProjection
    public WordDto(String id, String korName, String engName, String engInitName, String description) {
        this.id = id;
        this.korName = korName;
        this.engName = engName;
        this.engInitName = engInitName;
        this.description = description;
    }
}
