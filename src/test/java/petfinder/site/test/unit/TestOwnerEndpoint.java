package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.endpoint.OwnerEndpoint;

public class TestOwnerEndpoint {

	@Test
	public void testGetUser() {
		ElasticClientService cS = new ElasticClientService();
		OwnerEndpoint oP = new OwnerEndpoint(cS);
		List<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		OwnerDto owner = new OwnerDto(1, list, "111", "222", 2, 2020, "jack");
		OwnerDto ownerTest = null;
		try {
			ownerTest = oP.findOwner(1L);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedOperationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(owner.equals(ownerTest));
	}
	
	@Test
	public void testPutUser() {
		ElasticClientService cS = new ElasticClientService();
		OwnerEndpoint oP = new OwnerEndpoint(cS);
		List<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		OwnerDto owner = new OwnerDto(2, list, "333", "444", 2, 2020, "will");
		ResponseEntity<String> res = null;
		try {
			res = oP.regOwner(owner);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		System.out.println(res);
		Response response = null;
		try {
			response = cS.getClient().performRequest("GET", "/owner/external/" + 2 + "/_source",
			        Collections.singletonMap("pretty", "true"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String jsonString = null;
		try {
			jsonString = EntityUtils.toString(response.getEntity());
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper = new ObjectMapper();
		OwnerDto ownerTest = null;
		try {
			ownerTest = objectMapper.readValue(jsonString, OwnerDto.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(owner.equals(ownerTest));
	}
	

}
