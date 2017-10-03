package petfinder.site.endpoint;

import java.io.IOException;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.client.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.common.owner.OwnerService;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
@RestController
@RequestMapping(value = "/api/owner")
public class OwnerEndpoint {
	@Autowired
	private OwnerService ownerService;
	private ElasticClientService clientService;
	private static ObjectMapper mapper = new ObjectMapper();

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody OwnerDto findOwner(@PathVariable(name = "id") Long id) throws JsonParseException, JsonMappingException, IOException {
		return  mapper.readValue((JsonParser)clientService.getClient().performRequest(
			        "GET",
			        "/owner/external/" + id).getEntity(), OwnerDto.class);
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regOwners(@RequestBody OwnerDto owner) {
		ownerService.setOwner(owner);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}