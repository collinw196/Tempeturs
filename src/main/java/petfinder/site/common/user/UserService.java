package petfinder.site.common.user;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
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
}