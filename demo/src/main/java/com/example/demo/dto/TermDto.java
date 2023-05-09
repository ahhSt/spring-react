package com.example.demo.dto;

import java.util.List;

import com.example.demo.domain.Domain;
import com.example.demo.domain.Word;
import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder(builderMethodName = "TermDtoBuilder")
public class TermDto {
    @NotNull
    private Long id;
    private String korName;
    private String engName;
    private String engInitName;
    @NotNull
    private String domainId;
    private String description;

    private Domain domain;
    private List<Word> words;

    @QueryProjection
    public TermDto(Long id, String korName, String engName, String engInitName, String domainId, String description) {
        this.id = id;
        this.korName = korName;
        this.engName = engName;
        this.engInitName = engInitName;
        this.domainId = domainId;
        this.description = description;
    }

    public static TermDtoBuilder builder(TermDto termDto) {
        return TermDtoBuilder()
        .id(termDto.getId())
        .korName(termDto.getKorName())
        .engName(termDto.getEngName())
        .engInitName(termDto.getEngInitName())
        .domainId(termDto.getDomainId())
        .description(termDto.getDescription());
    }
}
