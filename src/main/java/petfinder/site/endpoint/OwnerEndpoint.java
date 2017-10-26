package petfinder.site.endpoint;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Response;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
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

import petfinder.site.common.calendar.CalendarBlockDto;
import petfinder.site.common.calendar.CalendarService;
import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.common.sitter.SitterComparator;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.owner.OwnerService;
import petfinder.site.common.pet.PetDto;
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
	private CalendarService calendarService;
	@Autowired
	private PetService petService;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private PetEndpoint petEndpoint;
	
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
	
	@SuppressWarnings("null")
	@RequestMapping(value = "/{sortSetting}", method = RequestMethod.GET)
	public List<SitterDto> sortSitters(@PathVariable(name = "sortSetting") int setting, @RequestBody CalendarBlockDto appointment) throws JsonParseException, JsonMappingException, IOException{
		SearchRequest searchRequest = new SearchRequest("sitter"); 
		searchRequest.types("external");
		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); 
		sourceBuilder.query(QueryBuilders.matchAllQuery()); 
		sourceBuilder.from(0); 
		sourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
		SearchResponse response = null;
		try {
			response = clientService.getHighClient().search(searchRequest);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		SearchHits hits = response.getHits();
		SearchHit[] searchHits = hits.getHits();
		ArrayList<SitterDto> sitterList = new ArrayList<SitterDto>();
		for (SearchHit hit : searchHits){
			SitterDto sitter = objectMapper.readValue(hit.getSourceAsString(), SitterDto.class);
			if (calendarService.isFree(sitter, appointment)){
				sitterList.add(sitter);			
			}
		}
		SitterComparator comp = new SitterComparator();
		comp.setSortType(setting);
		comp.setZip(userService.getUser().getZip());
		List<String> types = null;
		for(PetDto pet : petService.getPets()){
			types.add(pet.getType());
		}
		comp.setTypes(types);
		Collections.sort(sitterList, comp);
		return sitterList;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<String> cancelSitter(@PathVariable(name = "id") int id) throws IOException{
		Response response = clientService.getClient().performRequest("DELETE", "/owner/external/" + id,
		        Collections.singletonMap("pretty", "true"));
		return new ResponseEntity<String>("Added " + response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addpet", method = RequestMethod.POST)
	public ResponseEntity<String> addPet(@RequestBody PetDto pet) throws IOException {
		ResponseEntity<String> res = petEndpoint.regPet(pet);
		int id = Integer.parseInt(res.getBody());
		
		String jsonString = "{"
						+ "\"doc\": {"
							+ "\"petIds\": \"" + id + "\""
						+ "}"
					+ "}";

		HttpEntity entity = new NStringEntity(
		jsonString, ContentType.APPLICATION_JSON);
		Response indexResponse = clientService.getClient().performRequest(
		        "POST",
		        "/owner/external/" + userService.getUsername() + "/_update",
		        Collections.<String, String>emptyMap(),
		        entity);
		
		petService.setCurCount(0);
		return new ResponseEntity<String>("Added " + indexResponse, HttpStatus.OK);
	}
	
	public void paySitter(){
		// Pay the sitter after an appointment
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}