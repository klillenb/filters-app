package com.klillenb.filtersapi.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CriteriaDto {

    private Long id;

    private String name;

    private String condition;

    private String value;
}
