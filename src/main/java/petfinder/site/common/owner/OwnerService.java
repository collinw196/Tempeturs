package petfinder.site.common.owner;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
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
		UpdateRequest request1 = new UpdateRequest(
		        "owner", 
		        "external",  
		        userService.getUsername());
		
		String jsonRequest1String = "{\"petIds\": [";
		for (int i : getOwner().getPetIds()){
			jsonRequest1String += i + ", " ;
		}
		
		jsonRequest1String += id + "]}";
		
		request1.doc(jsonRequest1String, XContentType.JSON);
		clientService.getHighClient().update(request1);		
	}
}