package com.klillenb.filtersapi.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class FilterDto {

    private Long id;

    private String name;

    private String criteria;

    private String condition;

    private String filterValue;
}
