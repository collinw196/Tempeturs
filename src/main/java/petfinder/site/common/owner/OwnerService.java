package petfinder.site.common.owner;

import java.io.IOException;
import java.util.Collections;

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
	
	public OwnerService (){
		ownerDao = new OwnerDao();
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
}