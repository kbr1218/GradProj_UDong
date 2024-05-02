package com.example.udongserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing // JPA Auditing 활성화 설정
public class UDongServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(UDongServerApplication.class, args);
	}

}
