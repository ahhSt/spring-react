package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.cors().and().csrf().disable().authorizeHttpRequests((auth) -> auth.anyRequest().permitAll()).build();
    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        try{
//            registry.addMapping("/**")
//                    .allowedOrigins("*");
//        }
//        catch (Exception e){
//            e.printStackTrace();
//        }
//    }
    
	// @Bean
	// public Filter characterEncodingFilter() {
	// 	CharacterEncodingFilter filter = new CharacterEncodingFilter();
	// 	filter.setEncoding("UTF-8");
	// 	filter.setForceEncoding(true);
	// 	return filter;
	// }

}
