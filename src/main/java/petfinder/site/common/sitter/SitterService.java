package petfinder.site.common.sitter;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserDto;


/**
 * Created by mattdulany.
 */
@Service
public class SitterService {
	@Autowired
	private SitterDao sitterDao;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private SitterSearchFilter filter;
	@Autowired
	private ObjectMapper objectMapper;
	
	public SitterService(){
		
	}
	
	public SitterService(ElasticClientService cS) {
		sitterDao = new SitterDao();
		clientService = cS;
		filter = new SitterSearchFilter();
		objectMapper = new ObjectMapper();
	}
	
	public SitterService(SitterDao sD) {
		sitterDao = sD;
	}

	public SitterDto getSitter() {
		return sitterDao.getSitter();
	}
	
	public void addSitter(SitterDto sitter){
		sitterDao.setSitter(sitter);
	}

	public SitterSearchFilter getFilter() {
		return filter;
	}

	public void setFilter(SitterSearchFilter filter) {
		this.filter = filter;
	}
	
	public SitterDto updateService(String username) throws IOException {
		Response response = clientService.getClient().performRequest("GET", "/sitter/external/" + username + "/_source",
		        Collections.singletonMap("pretty", "true"));
		
		String jsonString = EntityUtils.toString(response.getEntity());
		
		SitterDto sitter = objectMapper.readValue(jsonString, SitterDto.class);
		addSitter(sitter);
		return sitter;
	}
}
	
