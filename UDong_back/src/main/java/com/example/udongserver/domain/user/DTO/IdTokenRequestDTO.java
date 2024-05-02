// IdTokenRequestDTO.java
package com.example.udongserver.domain.user.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IdTokenRequestDTO {
    private  String idToken; // 프론트가 보내는 구글의 access token을 여기에 담는다.
}
