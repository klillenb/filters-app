package com.klillenb.filtersapi.mapper;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.model.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class FilterMapper {

    private final CriteriaMapper criteriaMapper;

    public FilterDto map(Filter filter) {
        return new FilterDto()
                .setId(filter.getId())
                .setName(filter.getName())
                .setCriteria(
                        filter.getCriteria() == null
                            ? List.of()
                            : filter.getCriteria()
                                .stream()
                                .map(criteriaMapper::map)
                                .toList()
                );
    }

    public Filter map(FilterDto filterDto) {
        var filter = new Filter()
                .setName(filterDto.getName());

        return filter
                .setCriteria(
                        Optional.ofNullable(filterDto.getCriteria())
                                .orElse(List.of())
                                .stream()
                                .map(c -> {
                                    var criteria = criteriaMapper.map(c);
                                    criteria.setFilter(filter);
                                    return criteria;
                                })
                                .toList()
                );
    }
}
