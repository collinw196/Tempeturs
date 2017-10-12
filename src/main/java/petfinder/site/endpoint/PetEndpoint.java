package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.apache.http.HttpEntity;
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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;

/**
 * Created by mattdulany.
 */
@RestController
@RequestMapping(value = "/api/pet")
public class PetEndpoint {
	@Autowired
	private PetService petService;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	
	public PetEndpoint() {
		
	}
	
	public PetEndpoint(ElasticClientService cS) {
		clientService = cS;
		petService = new PetService();
		objectMapper = new ObjectMapper();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public PetDto findPet(@PathVariable(name = "id") Long id) throws IOException {
		if(clientService.getClient() == null) {
			return null;
		}
		Response response = clientService.getClient().performRequest("GET", "/pets/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		PetDto pet = objectMapper.readValue(jsonString, PetDto.class);
		petService.addPet(pet);
		return pet;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regPet(@RequestBody PetDto pet) throws IOException {
		Response response = clientService.getClient().performRequest("GET", "/pets/external/_count",
				Collections.<String, String>emptyMap());
		
		String jsonString1 = EntityUtils.toString(response.getEntity());
		
		JSONObject json = new JSONObject(jsonString1);
        int count = json.getInt("count");
        count = count + petService.getCurCount();
		Long id = new Long(count);
		pet.setId(id);
		petService.addPet(pet);
		
		return new ResponseEntity<String>(Integer.toString(count), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/finish", method = RequestMethod.POST)
	public ResponseEntity<String> finishRegPet() throws IOException {
		List<PetDto> pets = petService.getPets();
		for (PetDto pet : pets){
			Long id = pet.getId();
			String jsonString = objectMapper.writeValueAsString(pet);
			HttpEntity entity = new NStringEntity(
			        jsonString, ContentType.APPLICATION_JSON);
			
			clientService.getClient().performRequest(
			        "PUT",
			        "/pets/external/" + id,
			        Collections.<String, String>emptyMap(),
			        entity);
		}
		petService.setCurCount(0);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}