package petfinder.site;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

/**
 * Created by jlutteringer on 8/22/17.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	@Qualifier("userDetailsService")
	UserDetailsService userDetailsService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.csrf().disable()
				.authorizeRequests()
					.antMatchers("/").permitAll()
					.antMatchers("/api/login").permitAll()
					.antMatchers("/api/user/reg").permitAll()
					.antMatchers("/api/user/reg/finish").permitAll()
					.antMatchers("/api/sitter/reg").permitAll()
					.antMatchers("/api/sitter/reg/finish").permitAll()
					.antMatchers("/api/pet/reg").permitAll()
					.antMatchers("/api/pet/reg/finish").permitAll()
					.antMatchers("/api/owner/reg").permitAll()
					.antMatchers("/api/owner/reg/finish").permitAll()
					.antMatchers("/statics/**").permitAll()
				.anyRequest().authenticated()
					.and()
				.formLogin()
					.loginPage("/login")
					.permitAll()
					.and()
				.logout()
					.permitAll();

	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		 auth.userDetailsService(userDetailsService);
	}
}