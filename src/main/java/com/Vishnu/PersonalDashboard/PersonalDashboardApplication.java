package com.Vishnu.PersonalDashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.logging.Logger;

@SpringBootApplication
public class PersonalDashboardApplication {
	private static final Logger logger = Logger.getLogger(PersonalDashboardApplication.class.getName());

	public static void main(String[] args) {
		SpringApplication.run(PersonalDashboardApplication.class, args);
		logger.info("PersonalDashboardApplication Started at http://localhost:8080");
	}

}
