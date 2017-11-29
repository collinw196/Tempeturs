package petfinder.site.endpoint;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.Response;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.script.Script;
import org.elasticsearch.script.ScriptType;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.json.JSONObject;
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

import petfinder.site.common.calendar.AppointmentComparator;
import petfinder.site.common.calendar.CalendarAppointmentDto;
import petfinder.site.common.calendar.CalendarService;
import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.common.sitter.SitterComparator;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.sitter.SitterSearchFilter;
import petfinder.site.common.sitter.SitterService;
import petfinder.site.common.owner.OwnerService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.user.UserDto;
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
	private SitterService sitterService;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private PetEndpoint petEndpoint;
	private boolean isFilterUsed;
	
	public OwnerEndpoint() {
		
	}
	
	public OwnerEndpoint(ElasticClientService cS, UserService us, PetService ps, OwnerService oS) {
		clientService = cS;
		ownerService = oS;
		userService = us;
		petService = ps;
		sitterService = new SitterService(cS);
		objectMapper = new ObjectMapper();
		calendarService = new CalendarService(cS);
		petEndpoint = new PetEndpoint();
	}
	
	public OwnerEndpoint(ElasticClientService cS, UserService us, PetService ps, OwnerService oS,
			CalendarService clS, SitterService sS, PetEndpoint pE) {
		clientService = cS;
		ownerService = oS;
		userService = us;
		petService = ps;
		sitterService = sS;
		objectMapper = new ObjectMapper();
		calendarService = clS;
		petEndpoint = pE;
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public OwnerDto getOwner() {
		return ownerService.getOwner();
	}

	@RequestMapping(value = "/{username}", method = RequestMethod.GET)
	public OwnerDto findOwner(@PathVariable(name = "username") String username) throws JsonParseException, JsonMappingException, UnsupportedOperationException, IOException {
		OwnerDto owner = ownerService.updateService(username);
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
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public ResponseEntity<String> editOwner(@RequestBody OwnerDto owner) throws IOException {
		owner.setUsername(userService.getUsername());
		owner.setPetIds(petService.getPetIds());
		ownerService.setOwner(owner);
		
		String jsonString = objectMapper.writeValueAsString(owner);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		
		String username = owner.getUsername();
		Response indexResponse = clientService.getClient().performRequest(
		        "PUT",
		        "/owner/external/" + username,
		        Collections.<String, String>emptyMap(),
		        entity);
		return new ResponseEntity<String>("Changed " + indexResponse, HttpStatus.OK);
	}
	
	// These are empty functions without return types (since i dont know how they will be returned yet.
	// Also someone will need to add the @requestmappings (since those arent set in stone either)
	// Some of these functions may work better in the DTO/DAO
	// - Dylan
	
	@RequestMapping(value = "/appointment/request", method = RequestMethod.POST)
	public ResponseEntity<String> requestSitter(@RequestBody CalendarAppointmentDto appointment) throws ParseException, IOException{
		appointment.setNotificationMessage("Appointmnent has been scheduled");
		appointment.setType("Appt");
		appointment.setOwnerUsername(userService.getUsername());
		Response response = clientService.getClient().performRequest("GET", "/calendarappointments/external/_count",
				Collections.<String, String>emptyMap());
		
		String jsonString1 = EntityUtils.toString(response.getEntity());
		
		JSONObject json = new JSONObject(jsonString1);
        long count = json.getLong("count");
        appointment.setBlockId(count);
        
        String jsonString = objectMapper.writeValueAsString(appointment);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);	
		
		clientService.getClient().performRequest(
		        "PUT",
		        "/calendarappointments/external/" + count,
		        Collections.<String, String>emptyMap(),
		        entity);
		
		userService.updateNotifications((int)count, appointment.getUsername(), appointment.getOwnerUsername());
		
		return new ResponseEntity<String>("Added", HttpStatus.OK);        
	}
	
	@RequestMapping(value = "/appointment/filter", method = RequestMethod.POST)
	public ResponseEntity<String> setFilter(@RequestBody SitterSearchFilter filter){
		sitterService.setFilter(filter);
		isFilterUsed = true;
		return new ResponseEntity<String>("Set", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/appointment/sort/{sortSetting}", method = RequestMethod.POST)
	public List<SitterDto> sortSitters(@PathVariable(name = "sortSetting") int setting,
			@RequestBody CalendarAppointmentDto appointment) throws JsonParseException, JsonMappingException, IOException{
		SearchRequest searchRequest = new SearchRequest("sitter"); 
		searchRequest.types("external");
		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); 
		sourceBuilder.query(QueryBuilders.matchAllQuery()); 
		sourceBuilder.from(0); 
		sourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
		searchRequest.source(sourceBuilder);
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
			if(!sitter.getUsername().equals(userService.getUsername())){
				if (calendarService.isFree(sitter, appointment)){
					if(!isFilterUsed || sitterService.getFilter().doesMatch(sitter)){
						sitterList.add(sitter);			
					}
				}
			}	
		}
		SitterComparator comp = new SitterComparator();
		comp.setSortType(setting);
		comp.setZip(userService.getUser().getZip());
		List<String> types = new ArrayList<String>();
		for(PetDto pet : petService.getPets()){
			types.add(pet.getType());
		}
		comp.setTypes(types);
		Collections.sort(sitterList, comp);
		isFilterUsed = false;
		return sitterList;
	}
	
	@RequestMapping(value = "/appointment/cancel/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> cancelSitter(@PathVariable(name = "id") int id) throws IOException{
		Response response = clientService.getClient().performRequest("GET", "/calendarappointments/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		String jsonString = EntityUtils.toString(response.getEntity());
		
		CalendarAppointmentDto appointment = objectMapper.readValue(jsonString, CalendarAppointmentDto.class);
		UpdateRequest request1 = new UpdateRequest(
		        "calendarappointments", 
		        "external",  
		        Integer.toString(id));
		double value = appointment.getPaymentAmount() + 9.99;
		jsonString = "{"  
				+ "\"paymentAmount\": \"" + value + "\","
				+ "\"appointmentStatus\": \"CANCELLED\","
				+ "\"notificationMessage\": \"Appointment has been cancelled\""
				+ "}";

		request1.doc(jsonString, XContentType.JSON);

		UpdateResponse updateResponse = clientService.getHighClient().update(request1);
		
		userService.updateNotifications(id, appointment.getUsername(), appointment.getOwnerUsername());

		return new ResponseEntity<String>("Cancelled " + updateResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/addpet", method = RequestMethod.POST)
	public ResponseEntity<String> addPet(@RequestBody PetDto pet) throws IOException {		
		ResponseEntity<String> res = petEndpoint.regPet(pet);
		int id = Integer.parseInt(res.getBody());
		
		UpdateRequest request1 = new UpdateRequest(
		        "owner", 
		        "external",  
		        userService.getUsername());
		
		String jsonString = "{\"petIds\": [\"" + id + "\"]}";
		
		request1.doc(jsonString, XContentType.JSON);
		
		clientService.getHighClient().update(request1);
		
		petService.setCurCount(0);
		return new ResponseEntity<String>(Integer.toString(id), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/appointment/pay/{id}", method = RequestMethod.POST)
	public  ResponseEntity<String> paySitter(@PathVariable(name = "id") int id) throws IOException{		
		Response response = clientService.getClient().performRequest("GET", "/calendarappointments/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		String jsonString = EntityUtils.toString(response.getEntity());
		
		CalendarAppointmentDto appointment = objectMapper.readValue(jsonString, CalendarAppointmentDto.class);
		
		UpdateRequest request1 = new UpdateRequest(
		        "calendarappointments", 
		        "external",  
		        Integer.toString(id));
		
		jsonString = "{"  
								+ "\"paymentAmount\": \"" + 0.00 + "\","
								+ "\"appointmentStatus\": \"PAYED\","
								+ "\"notificationMessage\": \"Appointment has been payed\""
								+ "}";
		
		request1.doc(jsonString, XContentType.JSON);
		
		UpdateResponse updateResponse = clientService.getHighClient().update(request1);
		
		userService.updateNotifications(id, appointment.getUsername(), appointment.getOwnerUsername());
		
		return new ResponseEntity<String>("Payed", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/appointment/get", method = RequestMethod.GET)
	public List<CalendarAppointmentDto> getAppointments() throws IOException{
		SearchRequest searchRequest = new SearchRequest("calendarappointments"); 
		searchRequest.types("external");
		BoolQueryBuilder boolQuery = new BoolQueryBuilder();
		boolQuery.must(QueryBuilders.existsQuery("ownerUsername"));
		boolQuery.must(QueryBuilders.matchQuery("ownerUsername", userService.getUsername()));
		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); 
		sourceBuilder.query(boolQuery);  
		sourceBuilder.from(0); 
		sourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
		searchRequest.source(sourceBuilder);
		SearchResponse response = null;
		try {
			response = clientService.getHighClient().search(searchRequest);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		SearchHits hits = response.getHits();
		SearchHit[] searchHits = hits.getHits();
		ArrayList<CalendarAppointmentDto> appointmentList = new ArrayList<CalendarAppointmentDto>();
		for (SearchHit hit : searchHits){
			CalendarAppointmentDto appointment = objectMapper.readValue(hit.getSourceAsString(), CalendarAppointmentDto.class);
			if (calendarService.isOpen(appointment)){
				appointmentList.add(appointment);			
			}
		}
		AppointmentComparator comp = new AppointmentComparator();
		Collections.sort(appointmentList, comp);
		return appointmentList;
	}
	
	@RequestMapping(value = "/notifications", method = RequestMethod.GET)
	public List<CalendarAppointmentDto> getNotifications() throws IOException{		
		userService.updateService(userService.getUsername());
		ArrayList<CalendarAppointmentDto> notificationList = new ArrayList<CalendarAppointmentDto>();
		for (int id : userService.getUser().getNotificationIds()){
			Response response = clientService.getClient().performRequest("GET", "/calendarappointments/external/" + id + "/_source",
			        Collections.singletonMap("pretty", "true"));
			
			String jsonString = EntityUtils.toString(response.getEntity());
			
			CalendarAppointmentDto appointment = objectMapper.readValue(jsonString, CalendarAppointmentDto.class);
			if(!notificationList.contains(appointment)){
				notificationList.add(appointment);
			}
		}
		userService.removeNotId();
		userService.writeUser();
		return notificationList;
	}
	
	@RequestMapping(value = "/pets/get", method = RequestMethod.GET)
	public List<PetDto> getPets() throws IOException{
		ownerService.updateService(userService.getUsername());
		ArrayList<PetDto> petList = new ArrayList<PetDto>();
		for (int petId : ownerService.getOwner().getPetIds()){
			Response response = clientService.getClient().performRequest("GET", "/pets/external/" + petId + "/_source",
			        Collections.singletonMap("pretty", "true"));
			
			String jsonString = EntityUtils.toString(response.getEntity());
			
			PetDto pet = objectMapper.readValue(jsonString, PetDto.class);
			petList.add(pet);
		}
		return petList;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}