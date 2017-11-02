package petfinder.site;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


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