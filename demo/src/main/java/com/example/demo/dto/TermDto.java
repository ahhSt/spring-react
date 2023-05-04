package com.example.demo.dto;

import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TermDto {
    @NotNull
    private Long id;
    private String korName;
    private String engName;
    private String engInitName;
    @NotNull
    private Long domainId;
    private String description;

    @QueryProjection
    public TermDto(Long id, String korName, String engName, String engInitName, Long domainId, String description) {
        this.id = id;
        this.korName = korName;
        this.engName = engName;
        this.engInitName = engInitName;
        this.domainId = domainId;
        this.description = description;
    }
}
