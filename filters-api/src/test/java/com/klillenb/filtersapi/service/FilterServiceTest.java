package com.klillenb.filtersapi.service;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.exception.ResourceNotFoundException;
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
import static org.junit.jupiter.api.Assertions.assertThrows;
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
    private static final String CRITERIA = "Test criteria";
    private static final String CONDITION = "Test condition";
    private static final String FILTER_VALUE = "test value";

    private Filter createFilter() {
        return new Filter()
                .setId(ID)
                .setName(NAME)
                .setCriteria(CRITERIA)
                .setCondition(CONDITION)
                .setFilterValue(FILTER_VALUE);
    }

    private FilterDto createDto() {
        return new FilterDto()
                .setId(ID)
                .setName(NAME)
                .setCriteria(CRITERIA)
                .setCondition(CONDITION)
                .setFilterValue(FILTER_VALUE);
    }

    @Test
    void findAll_shouldReturnMappedDtos() {
        var filterList = List.of(createFilter());
        var dtoList = List.of(createDto());

        when(repository.findAll()).thenReturn(filterList);
        when(mapper.toDto(filterList.getFirst())).thenReturn(dtoList.getFirst());

        var result = target.findAll();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst()).isEqualTo(dtoList.getFirst());

        verify(repository).findAll();
        verify(mapper).toDto(filterList.getFirst());
    }

    @Test
    void save_shouldMapAndSaveCorrectly() {
        var dto = createDto();
        var filter = createFilter();

        when(mapper.toModel(dto)).thenReturn(filter);
        when(repository.save(filter)).thenReturn(filter);
        when(mapper.toDto(filter)).thenReturn(dto);

        var result = target.save(dto);

        assertThat(result).isEqualTo(dto);

        verify(mapper).toModel(dto);
        verify(repository).save(filter);
        verify(mapper).toDto(filter);
    }

    @Test
    void delete_shouldCallRepositoryWhenExists() {
        when(repository.existsById(ID)).thenReturn(true);

        target.delete(ID);

        verify(repository).existsById(ID);
        verify(repository).deleteById(ID);
    }

    @Test
    void delete_shouldThrowWhenNotExists() {
        when(repository.existsById(ID)).thenReturn(false);

        var exception = assertThrows(ResourceNotFoundException.class, () -> target.delete(ID));

        assertThat(exception.getMessage()).isEqualTo("Filter not found with id: " + ID);
        verify(repository).existsById(ID);
        verify(repository, never()).deleteById(any());
    }
}
