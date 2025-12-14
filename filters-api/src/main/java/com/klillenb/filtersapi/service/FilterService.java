package com.klillenb.filtersapi.service;

import com.klillenb.filtersapi.dto.FilterDto;
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
                .map(mapper::map).toList();
    }

    public FilterDto save(FilterDto filterDto) {
        var toSave = mapper.map(filterDto);
        var saved = repository.save(toSave);

        return mapper.map(saved);
    }
}
