package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
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
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	
	public UserEndpoint() {
		
	}
	
	public UserEndpoint(ElasticClientService cS) {
		clientService = cS;
		userService = new UserService();
		objectMapper = new ObjectMapper();
	}

	@RequestMapping(value = "/{username}", method = RequestMethod.GET)
	public UserDto findUser(@PathVariable(name = "username") String username) throws ParseException, IOException {
		if(clientService.getClient() == null) {
			return null;
		}
		Response response = clientService.getClient().performRequest("GET", "/users/external/" + username + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		UserDto user = objectMapper.readValue(jsonString, UserDto.class);
		userService.addUser(user);
		return user;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regUser(@RequestBody UserDto user) throws IOException {
		user.setRole("USER");
		user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
		userService.addUser(user);
		
		return new ResponseEntity<String>("Added to service", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/finish", method = RequestMethod.POST)
	public ResponseEntity<String> finishRegUser() throws IOException {
		UserDto user = userService.getUser();
		String username = user.getUsername();
		String jsonString = objectMapper.writeValueAsString(user);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		clientService.getClient().performRequest(
		        "PUT",
		        "/users/external/" + username,
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}
