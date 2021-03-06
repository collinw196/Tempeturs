package petfinder.site.endpoint;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;

/**
 * Created by mattdulany.
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
	@Autowired
	private UserService userService;
	
	public UserEndpoint() {
		
	}
	
	public UserEndpoint(UserService uS) {
		userService = uS;
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public UserDto getUser() {
		return userService.getUser();
	}

	@RequestMapping(value = "/{username}", method = RequestMethod.GET)
	public UserDto findUser(@PathVariable(name = "username") String username) throws ParseException, IOException {
		UserDto user = userService.updateService(username);
		return user;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regUser(@RequestBody UserDto user) throws IOException {
		user.setRole("USER");
		List<Integer> list = new ArrayList<Integer>();
		user.setNotificationIds(list);
		userService.addUser(user);
		
		return new ResponseEntity<String>("Added to service", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/finish", method = RequestMethod.POST)
	public ResponseEntity<String> finishRegUser() throws IOException {
		userService.writeUser();
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/edit", method = RequestMethod.POST)
	public ResponseEntity<String> editUser(@RequestBody UserDto user) throws IOException {
		user.setRole("USER");
		user.setNotificationIds(userService.getUser().getNotificationIds());
		userService.addUser(user);
		userService.writeUser();
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/type", method = RequestMethod.GET)
	public String getType() {
		return userService.getUser().getType();
	}
}
