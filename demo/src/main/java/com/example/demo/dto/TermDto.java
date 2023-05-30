package com.example.demo.dto;

import java.util.List;

import com.example.demo.domain.DataType;
import com.example.demo.domain.Domain;
import com.example.demo.domain.Word;
import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
// @AllArgsConstructor
@Getter
@Setter
// @Builder(builderMethodName = "TermDtoBuilder")
public class TermDto {
    @NotNull
    private Long id;
    private String korName;
    private String engName;
    private String engInitName;
    @NotNull
    private Long domainId;
    private String description;

    private Domain domain;
    private List<Word> words;

    private String length;
    private String type;

    @QueryProjection
    public TermDto(Long id, String korName, String engName, String engInitName, Long domainId, String description, String length, String type) {
        this.id = id;
        this.korName = korName;
        this.engName = engName;
        this.engInitName = engInitName;
        this.domainId = domainId;
        this.description = description;
        this.length = length;
        this.type = type;

    }

    // public static TermDtoBuilder builder(TermDto termDto) {
    //     return TermDtoBuilder()
    //     .id(termDto.getId())
    //     .korName(termDto.getKorName())
    //     .engName(termDto.getEngName())
    //     .engInitName(termDto.getEngInitName())
    //     .domainId(termDto.getDomainId())
    //     .description(termDto.getDescription());
    // }
}
