package com.example.demo.dto;

import com.querydsl.core.annotations.QueryProjection;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Data
@Getter
@Setter
public class DomainDto {
    @NotNull
    private Long id;
    private String korName;
    private String engName;
    private String engInitName;
    private String length;
    private String description;

    private Long dataTypeId;
    private String dataTypeName;

    @QueryProjection
    public DomainDto(Long id, String korName, String engName, String engInitName, String length, String description, String dataTypeName) {
        this.id = id;
        this.korName = korName;
        this.engName = engName;
        this.engInitName = engInitName;
        this.length = length;
        this.description = description;
        this.dataTypeName = dataTypeName;
    }
}
