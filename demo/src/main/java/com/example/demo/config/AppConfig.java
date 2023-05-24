package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.filter.CharacterEncodingFilter;

import jakarta.servlet.Filter;

@Configuration
public class AppConfig {
    
	// @Bean
	// public Filter characterEncodingFilter() {
	// 	CharacterEncodingFilter filter = new CharacterEncodingFilter();
	// 	filter.setEncoding("UTF-8");
	// 	filter.setForceEncoding(true);
	// 	return filter;
	// }

}
