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
import com.fasterxml.jackson.core.JsonProcessingException;
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

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public SitterDto findSitter(@PathVariable(name = "id") Long id) throws JsonParseException, JsonMappingException, IOException {
		if(clientService.getClient() == null) {
			return null;
		}
		Response response = clientService.getClient().performRequest("GET", "/sitter/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		SitterDto sitter = objectMapper.readValue(jsonString, SitterDto.class);
		sitterService.addSitter(sitter);
		return sitter;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regSitter(@RequestBody SitterDto sitter) {
		sitter.setUserId(userService.getId());
		sitterService.addSitter(sitter);
		return new ResponseEntity<String>("Added to Repo", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/finish", method = RequestMethod.POST)
	public ResponseEntity<String> finishRegSitter() throws IOException {
		SitterDto sitter = sitterService.getSitter();
		String jsonString = objectMapper.writeValueAsString(sitter);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		int id = sitter.getUserId();
		Response indexResponse = clientService.getClient().performRequest(
		        "PUT",
		        "/sitter/external/" + id,
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Added " + indexResponse, HttpStatus.OK);
	}
}
