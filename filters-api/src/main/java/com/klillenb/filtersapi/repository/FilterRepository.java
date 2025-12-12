package com.klillenb.filtersapi.repository;

import com.klillenb.filtersapi.model.Filter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilterRepository extends JpaRepository<Filter, Long> {
}
