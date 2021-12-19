package com.voguel.demo;

import com.voguel.demo.entities.User;
import com.voguel.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Random;
import java.util.stream.Stream;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

/*
	@Bean
	CommandLineRunner init(UserRepository userRepository) {
		return args -> {
			Stream.of("John", "Julie").forEach(name -> {
				String tel = "456545";
				String codeCompte = tel + generateCodeCompte();
				User user = new User(name, name ,name.toLowerCase() + "@domain.com"
						,tel,"a" , "000000",codeCompte);
			userRepository.save(user);
			});
			userRepository.findAll().forEach(System.out::println);
		};
	}
*/

	public  String generateCodeCompte() {

		Random rand = new Random();
		String card = "BE";
		for (int i = 0; i < 14; i++)
		{
			int n = rand.nextInt(10) + 0;
			card += Integer.toString(n);
		}
		return card;
	}


}
