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
import petfinder.site.common.pet.PetService;
import petfinder.site.common.user.UserService;

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
	private UserService userService;
	@Autowired
	private PetService petService;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	
	public OwnerEndpoint() {
		
	}
	
	public OwnerEndpoint(ElasticClientService cS, UserService us, PetService ps) {
		clientService = cS;
		ownerService = new OwnerService();
		userService = us;
		petService = ps;
		objectMapper = new ObjectMapper();
	}

	@RequestMapping(value = "/{username}", method = RequestMethod.GET)
	public OwnerDto findOwner(@PathVariable(name = "username") String username) throws JsonParseException, JsonMappingException, UnsupportedOperationException, IOException {
		if(clientService.getClient() == null) {
			return null;
		}
		Response response = clientService.getClient().performRequest("GET", "/owner/external/" + username + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		OwnerDto owner = objectMapper.readValue(jsonString, OwnerDto.class);
		ownerService.setOwner(owner);
		return owner;
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regOwner(@RequestBody OwnerDto owner) {
		owner.setUsername(userService.getUsername());
		owner.setPetIds(petService.getPetIds());
		ownerService.setOwner(owner);
		return new ResponseEntity<String>("Added to service", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/reg/finish", method = RequestMethod.POST)
	public ResponseEntity<String> finishRegOwner() throws IOException {
		OwnerDto owner = ownerService.getOwner();
		String jsonString = objectMapper.writeValueAsString(owner);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		
		String username = owner.getUsername();
		Response indexResponse = clientService.getClient().performRequest(
		        "PUT",
		        "/owner/external/" + username,
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Added " + indexResponse, HttpStatus.OK);
	}
	
	// These are empty functions without return types (since i dont know how they will be returned yet.
	// Also someone will need to add the @requestmappings (since those arent set in stone either)
	// Some of these functions may work better in the DTO/DAO
	// - Dylan
	
	public void requestSitter(){
		// The physical action of picking a sitter then sending a notification to the sitter and adding the appt to the calendar
	}
	
	public void sortSitters(){
		// Maybe put all the sorts in this function then use a 2nd param to choose the sort order
	}
	
	public void rateSitter(){
		// Called when the owner gives the sitter a 1-5 rating
	}
	
	public void cancelSitter(){
		// Opposite of selectSitter. Cancel the appt
	}
	
	public void addPet(){
		// add a pet to their list. (idk if we're having that functionality
	}
	
	public void paySitter(){
		// Pay the sitter after an appointment
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}