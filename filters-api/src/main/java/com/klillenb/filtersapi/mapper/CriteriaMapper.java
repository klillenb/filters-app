package com.klillenb.filtersapi.mapper;

import com.klillenb.filtersapi.dto.CriteriaDto;
import com.klillenb.filtersapi.model.Criteria;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class CriteriaMapper {

    public CriteriaDto map(Criteria criteria) {
        return new CriteriaDto()
                .setId(criteria.getId())
                .setName(criteria.getName())
                .setCondition(criteria.getCondition())
                .setValue(criteria.getCriteriaValue());
    }

    public Criteria map(CriteriaDto criteriaDto) {
        return new Criteria()
                .setName(criteriaDto.getName())
                .setCondition(criteriaDto.getCondition())
                .setCriteriaValue(criteriaDto.getValue());
    }
}
