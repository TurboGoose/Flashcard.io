package com.turbogoose.Flashcard.io.security;

import com.turbogoose.Flashcard.io.entity.UserEntity;
import com.turbogoose.Flashcard.io.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;

@Configuration
@EnableWebSecurity
@EnableOAuth2Sso
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${auth0.audience}")
    private String audience;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuer;

    @Bean
    JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = JwtDecoders.fromOidcIssuerLocation(issuer);
        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);
        jwtDecoder.setJwtValidator(withAudience);
        return jwtDecoder;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        http.authorizeRequests()

                .mvcMatchers("/login").permitAll()
                .anyRequest().authenticated()
                .and().oauth2ResourceServer().jwt();
    }

    @Bean
    public PrincipalExtractor principalExtractor(UserRepository userRepository) {
        return map -> {
            String id = (String) map.get("sub");
            UserEntity user = userRepository.findById(id).orElseGet(() -> {
                UserEntity newUser = new UserEntity();
                newUser.setUserId(id);
                newUser.setName((String) map.get("name"));
                newUser.setEmail((String) map.get("email"));
                newUser.setDecks(new ArrayList<>());
                return newUser;
            });
            return userRepository.save(user);
        };
    }
}