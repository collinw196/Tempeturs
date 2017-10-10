package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.pet.PetService;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;

/**
 * Created by mattdulany.
 */
@RestController
@RequestMapping(value = "/api/user")
public class UserEndpoint {
	
	private UserService userService;
	
	public UserEndpoint() {
		userService = new UserService();
	}
	
	public UserEndpoint(UserService uS){
		userService = uS;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public UserDto findUser(@PathVariable(name = "id") Long id) {
		return userService.findUser(id);
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regUser(@RequestBody UserDto user) {
		user.setId(1L);
		userService.addUser(user);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}
