package com.example.springboot.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("http://localhost:3000"); // React uygulamanızın adresi
        config.addAllowedHeader("*"); // Tüm header'ları izin ver
        config.addAllowedMethod("*"); // Tüm HTTP metotlarına izin ver
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
