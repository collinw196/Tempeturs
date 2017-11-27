package petfinder.site.endpoint;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.calendar.CalendarService;
import petfinder.site.common.owner.OwnerService;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.sitter.SitterService;
import petfinder.site.common.user.UserService;

/**
 * Created by jlutteringer on 10/10/17.
 */
@RestController
@RequestMapping(value = "/api/login")
public class LoginEndpoint {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserService userService;
	@Autowired
	private OwnerService ownerService;
	@Autowired
	private PetService petService;
	@Autowired
	private SitterService sitterService;
	
	public LoginEndpoint(AuthenticationManager am) {
		authenticationManager = am;
	}
	
	public static class LoginDto {
		private String username;
		private String password;
		private String type;

		public LoginDto() {
		}

		public LoginDto(String username, String password, String type) {
			this.username = username;
			this.password = password;
			this.type = type;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getUsername() {
			return username;
		}

		public String getPassword() {
			return password;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	public String login(@RequestBody LoginDto loginDto) {		
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
		Authentication auth = null;
		try {
			auth = authenticationManager.authenticate(token);
		} catch (Exception  e) {
			return "Failure";
		}
		
		try {
			userService.updateService(loginDto.getUsername());
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		if(userService.getUser().getType().equals("both") || !loginDto.getType().equals(userService.getUser().getType())){
			return "Failure";
		}
		
		if(loginDto.getType().equals("owner")){
			try {
				ownerService.updateService(loginDto.getUsername());
				petService.updateService();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		} else{
			try {
				sitterService.updateService(loginDto.getUsername());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		SecurityContextImpl securityContext = new SecurityContextImpl();
		securityContext.setAuthentication(auth);
		SecurityContextHolder.setContext(securityContext);
		return "Success";
	}
}