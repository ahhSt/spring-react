package com.example.demo.dto;

import com.querydsl.core.annotations.QueryProjection;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;

@Data
public class DomainDto {
    @NotNull
    private String id;
    private String korName;
    private String engName;
    private String engInitName;
    @NotNull
    private String dataTypeId;
    private String length;
    private String description;

    @QueryProjection
    public DomainDto(String id, String korName, String engName, String engInitName, String dataTypeId, String length, String description) {
        this.id = id;
        this.korName = korName;
        this.engName = engName;
        this.engInitName = engInitName;
        this.dataTypeId = dataTypeId;
        this.length = length;
        this.description = description;
    }
}
