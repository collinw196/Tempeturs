package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
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
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.common.owner.OwnerService;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@Configurable
@RequestMapping(value = "/api/owner")
public class OwnerEndpoint {
	@Autowired
	private OwnerService ownerService;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	
	public OwnerEndpoint() {
		
	}
	
	public OwnerEndpoint(ElasticClientService cS) {
		clientService = cS;
		ownerService = new OwnerService();
		objectMapper = new ObjectMapper();
	}
	
	public OwnerEndpoint(ElasticClientService cS, OwnerService oS) {
		clientService = cS;
		ownerService = oS;
		objectMapper = new ObjectMapper();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public OwnerDto findOwner(@PathVariable(name = "id") Long id) throws JsonParseException, JsonMappingException, UnsupportedOperationException, IOException {
		if(clientService.getClient() == null) {
			System.out.println("Not Good");
		}
		Response response = clientService.getClient().performRequest("GET", "/owner/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		OwnerDto owner = objectMapper.readValue(jsonString, OwnerDto.class);
		ownerService.setOwner(owner);
		return owner;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regOwner(@RequestBody OwnerDto owner) throws IOException {
		String jsonString = objectMapper.writeValueAsString(owner);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		ownerService.setOwner(owner);
		int id = owner.getUserId();
		Response indexResponse = clientService.getClient().performRequest(
		        "PUT",
		        "/owner/external/" + id,
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Added " + indexResponse, HttpStatus.OK);
	}
}