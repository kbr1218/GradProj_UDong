package com.example.udongserver.domain.regular.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class RegularDTO {

    private String item;
    private Integer frequency; //ex) 7,14, 30, 60, 90
    private String memo;


    @Builder
    public RegularDTO(String item, Integer frequency, String memo) {
        this.item = item;
        this.frequency = frequency;
        this.memo = memo;
    }
}