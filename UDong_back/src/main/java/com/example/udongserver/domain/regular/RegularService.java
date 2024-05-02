package com.example.udongserver.domain.regular;

import com.example.udongserver.domain.regular.DTO.RegularDTO;
import com.example.udongserver.domain.room.Room;
import com.example.udongserver.domain.room.RoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegularService {

    private final RegularRepository regularRepository;
    private final RoomRepository roomRepository;

    // regular purchase list 불러오기
    @Transactional
    public List<RegularDTO> getRegulars(Long roomId) {

        // 우선 방 찾기
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));

        List<Regular> regularList = regularRepository.findByRoomId(room);

        return convertToDTO(regularList);

    }


    // create
    @Transactional
    public void createRegulars(Long roomId, RegularDTO dto) {

        // 주어진 roomId로 Room을 찾음
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room with id " + roomId + " not found"));

        Regular regular = convertToEntity(room, dto);
        regularRepository.save(regular);
        log.info("saved");

    }

    //update
    @Transactional
    public boolean updateRegulars(Long regularId, RegularDTO newRegular){
        try {
            Optional<Regular> optionalRegular = regularRepository.findById(regularId);
            if (optionalRegular.isPresent()) {
                Regular regular = optionalRegular.get();
                regular.setItem(newRegular.getItem());
                regular.setFrequency(newRegular.getFrequency());
                regular.setMemo(newRegular.getMemo());

                regularRepository.save(regular);
                return true;

            } else {
                throw new IllegalArgumentException("Todo with id " + regularId + " not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating regulars: " + e.getMessage());
        }
    }

    // delete
    public boolean deleteRegulars(Long regularId) {
        Optional<Regular> optionalRegular = regularRepository.findById(regularId);

        if(optionalRegular.isPresent()) {
            regularRepository.delete(optionalRegular.get());
            return true;
        }
        return false;
    }

    private Regular convertToEntity(Room roomId, RegularDTO dto) {

        return Regular.builder()
                .item(dto.getItem())
                .roomId(roomId)
                .frequency(dto.getFrequency())
                .memo(dto.getMemo())
                .build();
    }

    private List<RegularDTO> convertToDTO(List<Regular> regularList) {
        return regularList.stream()
                .map(regular -> new RegularDTO(
                        regular.getItem(),
                        regular.getFrequency(),
                        regular.getMemo()))
                .collect(Collectors.toList());
    }

}
