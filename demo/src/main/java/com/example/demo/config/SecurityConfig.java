package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.servlet.http.HttpServletResponse;

import com.example.demo.service.UserService;

@SuppressWarnings("deprecation")
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Authentication
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(userService)
            .passwordEncoder(passwordEncoder());
    }

    // Authorization
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .cors()
            .and()
            .csrf().disable()

            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            .and()

            .authorizeRequests()

            .antMatchers(
                    "/",
                    "/login",
                    "/register",
                    "/events/**",
                    "/api/auth/**",
                    "/api/public/**"
            ).permitAll()

            .antMatchers("/api/dashboard/**").hasRole("ADMIN")

            .antMatchers("/admin/**").hasRole("ADMIN")

            .antMatchers("/user/**").hasRole("USER")

            .anyRequest().authenticated()

            .and()

            .formLogin()

            .loginProcessingUrl("/login")

            .usernameParameter("username")
            .passwordParameter("password")

            .successHandler((request, response, authentication) -> {

                String role = authentication.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority();

                response.setStatus(HttpServletResponse.SC_OK);
                response.setContentType("application/json");

                response.getWriter().write(
                        "{\"message\":\"Login Successful\",\"role\":\"" + role + "\"}"
                );
            })

            .failureHandler((request, response, exception) -> {

                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");

                response.getWriter().write(
                        "{\"message\":\"Invalid Username or Password\"}"
                );
            })

            .and()

            .logout()
            .logoutUrl("/logout")
            .logoutSuccessHandler((req,res,auth)->{

                res.setStatus(HttpServletResponse.SC_OK);
                res.setContentType("application/json");

                res.getWriter().write(
                        "{\"message\":\"Logout Success\"}"
                );

            })
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID");
    }
}