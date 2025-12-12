package com.klillenb.filtersapi.service;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.exception.ResourceNotFoundException;
import com.klillenb.filtersapi.mapper.FilterMapper;
import com.klillenb.filtersapi.repository.FilterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilterService {

    private final FilterRepository repository;

    private final FilterMapper mapper;

    public List<FilterDto> findAll() {
        return repository
                .findAll()
                .stream()
                .map(mapper::toDto).toList();
    }

    public FilterDto save(FilterDto filterDto) {
        // TODO: validation
        var toSave = mapper.toModel(filterDto);
        var saved = repository.save(toSave);

        return mapper.toDto(saved);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Filter not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
