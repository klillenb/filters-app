package com.klillenb.filtersapi.mapper;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.model.Filter;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class FilterMapperTest {

    private static final long ID = 1L;
    private static final String NAME = "Test NAME";
    private static final String CRITERIA = "Test CRITERIA";
    private static final String CONDITION = "Test CONDITION";
    private static final String FILTER_VALUE = "test value";

    private final FilterMapper target = new FilterMapper();

    @Test
    void toDto_shouldMapAllFieldsCorrectly() {
        var filter = new Filter()
                .setId(ID)
                .setName(NAME)
                .setCriteria(CRITERIA)
                .setCondition(CONDITION)
                .setFilterValue(FILTER_VALUE);

        var dto = target.toDto(filter);

        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(ID);
        assertThat(dto.getName()).isEqualTo(NAME);
        assertThat(dto.getCriteria()).isEqualTo(CRITERIA);
        assertThat(dto.getCondition()).isEqualTo(CONDITION);
        assertThat(dto.getFilterValue()).isEqualTo(FILTER_VALUE);
    }

    @Test
    void toModel_shouldMapAllFieldsCorrectly() {
        var dto = new FilterDto()
                .setName(NAME)
                .setCriteria(CRITERIA)
                .setCondition(CONDITION)
                .setFilterValue(FILTER_VALUE);

        var model = target.toModel(dto);

        assertThat(model).isNotNull();
        assertThat(model.getName()).isEqualTo(NAME);
        assertThat(model.getCriteria()).isEqualTo(CRITERIA);
        assertThat(model.getCondition()).isEqualTo(CONDITION);
        assertThat(model.getFilterValue()).isEqualTo(FILTER_VALUE);
    }
}
