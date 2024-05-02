// UserDTO.java
package com.example.udongserver.domain.user.DTO;

import com.example.udongserver.domain.user.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private Long roomId;
    private String pictureUrl;
    private String role;

    public static final UserDTO convertToDTO (User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roomId(user.getRoomId() != null ? user.getRoomId().getId() : null)
                .pictureUrl(user.getPictureUrl())
                .role(user.getRole().name())
                .build();
    }
}
