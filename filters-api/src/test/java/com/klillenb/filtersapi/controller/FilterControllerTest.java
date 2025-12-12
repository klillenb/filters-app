package com.klillenb.filtersapi.controller;

import com.klillenb.filtersapi.dto.FilterDto;
import com.klillenb.filtersapi.service.FilterService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FilterController.class)
@AutoConfigureMockMvc(addFilters = false)
class FilterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private FilterService service;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String URI = "/api/v1/filters";

    @Test
    void getAll_shouldReturnOkWithFilters() throws Exception {
        var id = 1L;
        var name = "Test";
        var filterDto = new FilterDto()
                .setId(id)
                .setName(name);

        given(service.findAll()).willReturn(List.of(filterDto));

        mockMvc.perform(get(URI))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(id))
                .andExpect(jsonPath("$[0].name").value(name));
    }

    @Test
    void getAll_shouldReturnNoContentWhenEmpty() throws Exception {
        given(service.findAll()).willReturn(List.of());

        mockMvc.perform(get(URI))
                .andExpect(status().isNoContent());
    }

    @Test
    void create_shouldReturnCreated() throws Exception {
        var name = "New filter";
        var id = 1L;

        var request = new FilterDto()
                .setName(name);
        var created = new FilterDto()
                .setId(id)
                .setName(name);

        given(service.save(any())).willReturn(created);

        mockMvc.perform(post(URI)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value(name));
    }

    @Test
    void delete_shouldReturnNoContent() throws Exception {
        doNothing().when(service).delete(1L);

        mockMvc.perform(delete(URI + "/1"))
                .andExpect(status().isNoContent());
    }
}
