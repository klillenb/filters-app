package com.klillenb.filtersapi.service;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.mapper.FilterMapper;
import com.klillenb.filtersapi.model.Filter;
import com.klillenb.filtersapi.repository.FilterRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FilterServiceTest {

    @Mock
    private FilterRepository repository;

    @Mock
    private FilterMapper mapper;

    @InjectMocks
    private FilterService target;

    private static final long ID = 1L;
    private static final String NAME = "Test name";

    private Filter createFilter() {
        return new Filter()
                .setId(ID)
                .setName(NAME);
    }

    private FilterDto createDto() {
        return new FilterDto().setName(NAME);
    }

    @Test
    void findAll_shouldReturnMappedDtos() {
        var filterList = List.of(createFilter());
        var dtoList = List.of(createDto());

        when(repository.findAll()).thenReturn(filterList);
        when(mapper.map(filterList.getFirst())).thenReturn(dtoList.getFirst());

        var result = target.findAll();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst()).isEqualTo(dtoList.getFirst());

        verify(repository).findAll();
        verify(mapper).map(filterList.getFirst());
    }

    @Test
    void save_shouldMapAndSaveCorrectly() {
        var dto = createDto();
        var filter = createFilter();

        when(mapper.map(dto)).thenReturn(filter);
        when(repository.save(filter)).thenReturn(filter);
        when(mapper.map(filter)).thenReturn(dto);

        var result = target.save(dto);

        assertThat(result).isEqualTo(dto);

        verify(mapper).map(dto);
        verify(repository).save(filter);
        verify(mapper).map(filter);
    }
}
