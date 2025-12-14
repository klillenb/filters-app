package com.klillenb.filtersapi.mapper;

import com.klillenb.filtersapi.dto.CriteriaDto;
import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.model.Criteria;
import com.klillenb.filtersapi.model.Filter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FilterMapperTest {

    private static final long ID = 1L;
    private static final String NAME = "Test NAME";

    @Mock
    private CriteriaMapper criteriaMapper;

    @InjectMocks
    private FilterMapper target;

    @Test
    void mapFilterToFilterDro_shouldMapAllFieldsCorrectly() {
        var criteria = new Criteria();
        var filter = new Filter()
                .setId(ID)
                .setName(NAME)
                .setCriteria(List.of(criteria));

        var criteriaDto = new CriteriaDto();
        when(criteriaMapper.map(criteria)).thenReturn(criteriaDto);

        var dto = target.map(filter);

        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(ID);
        assertThat(dto.getName()).isEqualTo(NAME);
        assertThat(dto.getCriteria().getFirst()).isEqualTo(criteriaDto);

        verify(criteriaMapper, times(1)).map(criteria);
    }

    @Test
    void mapFilterDtoToFilter_shouldMapAllFieldsCorrectly() {
        var criteriaDto = new CriteriaDto();
        var filterDto = new FilterDto()
                .setName(NAME)
                .setCriteria(List.of(criteriaDto));

        var criteria = new Criteria();
        when(criteriaMapper.map(criteriaDto)).thenReturn(criteria);

        var model = target.map(filterDto);

        assertThat(model).isNotNull();
        assertThat(model.getName()).isEqualTo(NAME);

        model.getCriteria().forEach(c -> assertThat(c.getFilter()).isEqualTo(model));

        verify(criteriaMapper, times(1)).map(criteriaDto);
    }
}
