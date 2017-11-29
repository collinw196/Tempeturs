package petfinder.site.common.owner;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserService;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class OwnerService {
	@Autowired
	private OwnerDao ownerDao;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private UserService userService;
	
	public OwnerService (ElasticClientService cS, UserService uS){
		ownerDao = new OwnerDao();
		clientService = cS;
		userService = uS;
		objectMapper = new ObjectMapper();
	}

	public OwnerDto getOwner() {
		return ownerDao.getOwner();
	}
	
	public void setOwner(OwnerDto owner){
		ownerDao.setOwner(owner);
	}
	
	public OwnerDto updateService(String username) throws IOException{
		Response response = clientService.getClient().performRequest("GET", "/owner/external/" + username + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		OwnerDto owner = objectMapper.readValue(jsonString, OwnerDto.class);
		setOwner(owner);
		userService.updateService(username);
		return owner;
	}

	public void updatePetAdded(Long id) throws ParseException, IOException {
		Response response = clientService.getClient().performRequest("GET", "/owner/external/" + ownerDao.getOwner().getUsername() + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		OwnerDto owner = objectMapper.readValue(jsonString, OwnerDto.class);
		List<Integer> petIds = owner.getPetIds();
		petIds.add(id.intValue());
		owner.setPetIds(petIds);
		jsonString = objectMapper.writeValueAsString(owner);
		HttpEntity entity = new NStringEntity(
		        jsonString, ContentType.APPLICATION_JSON);
		
		String username = owner.getUsername();
		clientService.getClient().performRequest(
		        "PUT",
		        "/owner/external/" + username,
		        Collections.<String, String>emptyMap(),
		        entity);		
	}
}