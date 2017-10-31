package petfinder.site.common.user;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.Response;
import org.elasticsearch.common.xcontent.XContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	
	public UserService(ElasticClientService cS) {
		userDao = new UserDao();
		clientService = cS;
		objectMapper = new ObjectMapper();
	}
	
	public UserService(UserDao uD) {
		userDao = uD;
	}

	public UserDto getUser() {
		return userDao.getUser();
	}
	
	public void addUser(UserDto user){
		userDao.setUser(user);
	}

	public String getUsername() {
		return userDao.getUser().getUsername();
	}
	
	public void removeNotId(){
		userDao.getUser().removeNotId();
	}
	
	public void writeUser() throws IOException {
		String username = getUsername();
		String jsonString = objectMapper.writeValueAsString(userDao.getUser());
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		clientService.getClient().performRequest(
		        "PUT",
		        "/users/external/" + username,
		        Collections.<String, String>emptyMap(),
		        entity);
	}

	public UserDto updateService(String username) throws IOException {
		Response response = clientService.getClient().performRequest("GET", "/users/external/" + username + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		UserDto user = objectMapper.readValue(jsonString, UserDto.class);
		addUser(user);
		return user;
	}
	
	public void updateNotifications(int id, String username1, String username2) throws IOException{
		Response response = clientService.getClient().performRequest("GET", "/users/external/" + username1 + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		UserDto user1 = objectMapper.readValue(jsonString, UserDto.class);
		List<Integer> list1 = user1.getNotificationIds();
		response = clientService.getClient().performRequest("GET", "/users/external/" + username2 + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		jsonString = EntityUtils.toString(response.getEntity());
		
		user1 = objectMapper.readValue(jsonString, UserDto.class);
		List<Integer> list2 = user1.getNotificationIds();
		
		UpdateRequest request1 = new UpdateRequest(
		        "users", 
		        "external",  
		        username1);
		UpdateRequest request2 = new UpdateRequest(
		        "users", 
		        "external",  
		        username2);
		
		String jsonRequest1String = "{\"notificationIds\": [";
		String jsonRequest2String = "{\"notificationIds\": [";
		for (int i : list1){
			jsonRequest1String += i + ", " ;
		}
		for (int i : list2){
			jsonRequest2String += i + ", " ;
		}
		
		jsonRequest1String += id + "]}";
		jsonRequest2String += id + "]}";
		
		request1.doc(jsonRequest1String, XContentType.JSON);
		request2.doc(jsonRequest2String, XContentType.JSON);
		
		UpdateResponse updateResponse = clientService.getHighClient().update(request1);
		updateResponse = clientService.getHighClient().update(request2);
	}
}