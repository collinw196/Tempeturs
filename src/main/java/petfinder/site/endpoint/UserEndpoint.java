package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public UserDto findUser(@PathVariable(name = "id") Long id) throws ParseException, IOException {
		if(clientService.getClient() == null) {
			return null;
		}
		Response response = clientService.getClient().performRequest("GET", "/users/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		UserDto user = objectMapper.readValue(jsonString, UserDto.class);
		userService.addUser(user);
		return user;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regUser(@RequestBody UserDto user) throws IOException {
		Response response = clientService.getClient().performRequest("GET", "/users/external/_count",
				Collections.<String, String>emptyMap());
		
		String jsonString1 = EntityUtils.toString(response.getEntity());
		
		JSONObject json = new JSONObject(jsonString1);
        int count = json.getInt("count");
		Long id = new Long(count);
		user.setId(id);
		userService.addUser(user);
		
		return new ResponseEntity<String>(Integer.toString(count), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/finish", method = RequestMethod.POST)
	public ResponseEntity<String> finishRegUser() throws IOException {
		UserDto user = userService.getUser();
		Long id = user.getId();
		String jsonString = objectMapper.writeValueAsString(user);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		clientService.getClient().performRequest(
		        "PUT",
		        "/users/external/" + id,
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}
