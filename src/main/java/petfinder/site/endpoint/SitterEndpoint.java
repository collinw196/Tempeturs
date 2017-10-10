package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;

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

/**
 * Created by mattdulany on 9/27/2017.
 */
@RestController
@RequestMapping(value = "/api/sitter")
public class SitterEndpoint {
	@Autowired
	private SitterService sitterService;
	private ElasticClientService clientService;
	private ObjectMapper objectMapper;
	
	public SitterEndpoint() {
		
	}
	
	public SitterEndpoint(ElasticClientService cS){
		clientService = cS;
		sitterService = new SitterService();
		objectMapper = new ObjectMapper();
	}
	
	public SitterEndpoint(SitterService sS, ElasticClientService cS){
		sitterService = sS;
		clientService = cS;
		objectMapper = new ObjectMapper();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public SitterDto findSitter(@PathVariable(name = "id") Long id) throws JsonParseException, JsonMappingException, IOException {
		if(clientService.getClient() == null) {
			System.out.println("Not Good");
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
		sitterService.addSitter(sitter);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}
