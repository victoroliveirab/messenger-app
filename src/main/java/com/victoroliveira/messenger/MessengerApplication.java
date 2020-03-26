package com.victoroliveira.messenger;

import com.victoroliveira.messenger.utils.CustomPasswordEncoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class MessengerApplication {

	@Bean
	public CustomPasswordEncoder bCryptPasswordEncoder() {
		return new CustomPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(MessengerApplication.class, args);
		System.out.println("Server is up");
	}

}

class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(MessengerApplication.class);
	}

}
