package com.klillenb.filtersapi.controller;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.service.FilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/filters")
public class FilterController {

    private final FilterService service;

    @GetMapping
    public ResponseEntity<List<FilterDto>> getAll() {
        List<FilterDto> filters = service.findAll();

        return filters.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(filters);
    }

    @PostMapping
    public ResponseEntity<FilterDto> create(@RequestBody FilterDto filter) {
        FilterDto created = service.save(filter);

        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
