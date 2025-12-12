package com.klillenb.filtersapi.mapper;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.model.Filter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class FilterMapper {

    public FilterDto toDto(Filter filter) {
        return new FilterDto()
                .setId(filter.getId())
                .setName(filter.getName())
                .setCriteria(filter.getCriteria())
                .setCondition(filter.getCondition())
                .setFilterValue(filter.getFilterValue());
    }

    public Filter toModel(FilterDto filter) {
        return new Filter()
                .setName(filter.getName())
                .setCriteria(filter.getCriteria())
                .setCondition(filter.getCondition())
                .setFilterValue(filter.getFilterValue());
    }
}
