package com.klillenb.filtersapi.mapper;

import com.klillenb.filtersapi.dto.CriteriaDto;
import com.klillenb.filtersapi.model.Criteria;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class CriteriaMapperTest {

    private final CriteriaMapper target = new CriteriaMapper();

    private static final Long ID = 1L;
    private static final String NAME = "Test Name";
    private static final String CONDITION = "Test Condition";
    private static final String VALUE = "Test Value";

    @Test
    void mapCriteriaToCriteriaDto_shouldMapAllFields() {
        var criteria = new Criteria()
                .setId(ID)
                .setName(NAME)
                .setCondition(CONDITION)
                .setCriteriaValue(VALUE);

        var dto = target.map(criteria);

        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(ID);
        assertThat(dto.getName()).isEqualTo(NAME);
        assertThat(dto.getCondition()).isEqualTo(CONDITION);
        assertThat(dto.getValue()).isEqualTo(VALUE);
    }

    @Test
    void mapCriteriaDtoToCriteria_shouldMapAllFields() {
        var dto = new CriteriaDto()
                .setId(ID)
                .setName(NAME)
                .setCondition(CONDITION)
                .setValue(VALUE);

        var criteria = target.map(dto);

        assertThat(criteria).isNotNull();
        assertThat(criteria.getName()).isEqualTo(NAME);
        assertThat(criteria.getCondition()).isEqualTo(CONDITION);
        assertThat(criteria.getCriteriaValue()).isEqualTo(VALUE);
    }
}
