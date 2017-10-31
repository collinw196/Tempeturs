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
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.Response;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
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

import petfinder.site.common.calendar.AppointmentComparator;
import petfinder.site.common.calendar.CalendarAppointmentDto;
import petfinder.site.common.calendar.CalendarService;
import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.sitter.SitterService;
import petfinder.site.common.user.UserDto;
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
	@Autowired
	private CalendarService calendarService;
	
	
	public SitterEndpoint() {
		
	}
	
	public SitterEndpoint(ElasticClientService cS, UserService us, SitterService sS){
		clientService = cS;
		sitterService = sS;
		userService = us;
		calendarService = new CalendarService(cS);
		objectMapper = new ObjectMapper();
	}
	
	public SitterEndpoint(ElasticClientService cS, UserService us, SitterService sS, CalendarService clS){
		clientService = cS;
		sitterService = sS;
		userService = us;
		calendarService = clS;
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
		sitter.setZip(userService.getUser().getZip());
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
	
	@RequestMapping(value = "/appointment/accept/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> acceptAppt(@PathVariable(name = "id") int id) throws IOException{
		Response response = clientService.getClient().performRequest("GET", "/calendarappointments/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		String jsonString = EntityUtils.toString(response.getEntity());
		
		CalendarAppointmentDto appointment = objectMapper.readValue(jsonString, CalendarAppointmentDto.class);
		UpdateRequest request1 = new UpdateRequest(
		        "calendarappointments", 
		        "external",  
		        Integer.toString(id));
		jsonString = "{"  
				+ "\"appointmentStatus\": \"ACCEPTED\","
				+ "\"notificationMessage\": \"Appointment has been accepted\""
				+ "}";

		request1.doc(jsonString, XContentType.JSON);

		UpdateResponse updateResponse = clientService.getHighClient().update(request1);
		
		userService.updateNotifications(id, appointment.getUsername(), appointment.getOwnerUsername());

		return new ResponseEntity<String>("Cancelled " + updateResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/appointment/deny/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> denyAppt(@PathVariable(name = "id") int id) throws IOException{
		Response response = clientService.getClient().performRequest("GET", "/calendarappointments/external/" + id + "/_source",
		        Collections.singletonMap("pretty", "true"));
		String jsonString = EntityUtils.toString(response.getEntity());
		
		CalendarAppointmentDto appointment = objectMapper.readValue(jsonString, CalendarAppointmentDto.class);
		UpdateRequest request1 = new UpdateRequest(
		        "calendarappointments", 
		        "external",  
		        Integer.toString(id));
		jsonString = "{"  
				+ "\"appointmentStatus\": \"REFUSED\","
				+ "\"notificationMessage\": \"Appointment has been refused\""
				+ "}";

		request1.doc(jsonString, XContentType.JSON);

		UpdateResponse updateResponse = clientService.getHighClient().update(request1);
		
		userService.updateNotifications(id, appointment.getUsername(), appointment.getOwnerUsername());

		return new ResponseEntity<String>("Cancelled " + updateResponse, HttpStatus.OK);
	}
	
	public void editPreference(){
		// Sitter no longer likes dogs. or something
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
	
	@RequestMapping(value = "/rat/{username}/{value}", method = RequestMethod.POST)
	public ResponseEntity<String> rateSitter(@PathVariable(name = "username") String username, @PathVariable(name = "value") double value) throws IOException{
		if(value < 1.0){
			value = 1.0;
		}
		
		UpdateRequest request1 = new UpdateRequest(
		        "sitter", 
		        "external",  
		        username);
		
		String jsonString = "{\"rating\": " + value + "}";
		
		request1.doc(jsonString, XContentType.JSON);
		
		UpdateResponse updateResponse = clientService.getHighClient().update(request1);
		
		Response response = clientService.getClient().performRequest("GET", "/users/external/" + username + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		jsonString = EntityUtils.toString(response.getEntity());
		
		UserDto user1 = objectMapper.readValue(jsonString, UserDto.class);
		List<Long> list1 = user1.getNotificationIds();
		
		String jsonRequest1String = "{\"notificationIds\": [";
		for (Long i : list1){
			jsonRequest1String += i + ", " ;
		}
		
		jsonRequest1String += -value + "]}";
		
		request1.doc(jsonRequest1String, XContentType.JSON);
		
		updateResponse = clientService.getHighClient().update(request1);
		return new ResponseEntity<String>("Rated " + updateResponse, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/appointment/get", method = RequestMethod.GET)
	public List<CalendarAppointmentDto> getAppointments() throws IOException{
		SearchRequest searchRequest = new SearchRequest("calendarappointments"); 
		searchRequest.types("external");
		BoolQueryBuilder boolQuery = new BoolQueryBuilder();
		boolQuery.must(QueryBuilders.matchQuery("username", userService.getUsername()));
		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); 
		sourceBuilder.query(boolQuery);  
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
	
	@RequestMapping(value = "/notifications/appt", method = RequestMethod.GET)
	public List<CalendarAppointmentDto> getApptNotifications() throws IOException{		
		userService.updateService(userService.getUsername());
		ArrayList<CalendarAppointmentDto> notificationList = new ArrayList<CalendarAppointmentDto>();
		for (Long id : userService.getUser().getNotificationIds()){
			Response response = clientService.getClient().performRequest("GET", "/calendarappointments/external/" + id + "/_source",
			        Collections.singletonMap("pretty", "true"));
			
			String jsonString = EntityUtils.toString(response.getEntity());
			
			CalendarAppointmentDto appointment = objectMapper.readValue(jsonString, CalendarAppointmentDto.class);
			notificationList.add(appointment);
		}
		return notificationList;
	}
	
	@RequestMapping(value = "/notifications/rat", method = RequestMethod.GET)
	public List<String> getRatNotifications() throws IOException{		
		userService.updateService(userService.getUsername());
		ArrayList<String> notificationList = new ArrayList<String>();
		for (Long id : userService.getUser().getNotificationIds()){
			if(id < 0){
				long value = id * -1;
				notificationList.add("You were given a " + value + " rating!");
			}
		}
		userService.removeNotId();
		userService.writeUser();
		return notificationList;
	}
}
