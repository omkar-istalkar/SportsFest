package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletResponse;

import com.example.demo.service.AdminService;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AdminService adminDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(adminDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
            .cors()
            .and()
            .csrf().disable()

            .authorizeRequests()

            .antMatchers(
                    "/",
                    "/login",
                    "/events/**",
                    "/api/**"
            ).permitAll()

            .antMatchers("/admin/**").authenticated()

            .anyRequest().permitAll()

            .and()

            .formLogin()

            .loginProcessingUrl("/login")
            .usernameParameter("userName")
            .passwordParameter("password")

            .successHandler((request, response, authentication) -> {

                response.setStatus(HttpServletResponse.SC_OK);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\":\"Login Successful\"}");
            })

            .failureHandler((request, response, exception) -> {

                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\":\"Invalid Username or Password\"}");
            })

            .and()

            .logout()

            .logoutUrl("/logout")

            .logoutSuccessHandler((req,res,auth)->{

                res.setStatus(HttpServletResponse.SC_OK);
                res.getWriter().write("Logout Success");

            })

            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID");
    }
}