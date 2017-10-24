package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.HttpEntity;
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

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.sitter.SitterService;
import petfinder.site.common.user.UserService;

/**
 * Created by mattdulany on 9/27/2017.
 */
@RestController
@RequestMapping(value = "/api/sitter")
public class SitterEndpoint {
	@Autowired
	private SitterService sitterService;
	@Autowired
	private UserService userService;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	
	public SitterEndpoint() {
		
	}
	
	public SitterEndpoint(ElasticClientService cS, UserService us){
		clientService = cS;
		sitterService = new SitterService();
		userService = us;
		objectMapper = new ObjectMapper();
	}

	@RequestMapping(value = "/{username}", method = RequestMethod.GET)
	public SitterDto findSitter(@PathVariable(name = "username") String username) throws JsonParseException, JsonMappingException, IOException {
		if(clientService.getClient() == null) {
			return null;
		}
		Response response = clientService.getClient().performRequest("GET", "/sitter/external/" + username + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		SitterDto sitter = objectMapper.readValue(jsonString, SitterDto.class);
		sitterService.addSitter(sitter);
		return sitter;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regSitter(@RequestBody SitterDto sitter) {
		sitter.setUsername(userService.getUsername());
		sitterService.addSitter(sitter);
		return new ResponseEntity<String>("Added to Repo", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/finish", method = RequestMethod.POST)
	public ResponseEntity<String> finishRegSitter() throws IOException {
		SitterDto sitter = sitterService.getSitter();
		String jsonString = objectMapper.writeValueAsString(sitter);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		String username = sitter.getUsername();
		Response indexResponse = clientService.getClient().performRequest(
		        "PUT",
		        "/sitter/external/" + username,
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Added " + indexResponse, HttpStatus.OK);
	}
	
	// These are empty functions without return types (since i dont know how they will be returned yet.
		// Also someone will need to add the @requestmappings (since those arent set in stone either)
		// Some of these functions may work better in the DTO/DAO
		// - Dylan
	
	public void acceptAppt(){
		// Sitter accepting an owner's request to have them sit
	}
	
	public void denyAppt(){
		// Sitter denying owner's request to have them sit
	}
	
	public void editPreference(){
		// Sitter no longer likes dogs. or something
	}
	
	@RequestMapping(value = "/rat/{username}/{value}", method = RequestMethod.POST)
	public ResponseEntity<String> rateSitter(@PathVariable(name = "username") String username, @PathVariable(name = "value") double value) throws IOException{
		if(value < 1.0){
			value = 1.0;
		}
		
		String jsonString = "{"
								+ "\"doc\": {"
									+ "\"rating\": \"" + value + "\""
								+ "}"
							+ "}";
		
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		
		Response indexResponse = clientService.getClient().performRequest(
		        "POST",
		        "/sitter/external/" + username + "/_update",
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Rated " + indexResponse, HttpStatus.OK);
	}
}
