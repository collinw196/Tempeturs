package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.json.JSONObject;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.endpoint.SitterEndpoint;

public class TestSitterEndpoint {

	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		UserService us = new UserService();
		Response response = null;
		try {
			response = cS.getClient().performRequest("GET", "/sitter/external/_count",
					Collections.<String, String>emptyMap());
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		String jsonString1 = null;
		try {
			jsonString1 = EntityUtils.toString(response.getEntity());
		} catch (ParseException | IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		JSONObject json = new JSONObject(jsonString1);
        int count = json.getInt("count");
		SitterDto sitter = new SitterDto(count, "333", "444", "dog", "cat", "horse");
		ResponseEntity<String> res = null;
		UserDto user = new UserDto();
		user.setId(Integer.toUnsignedLong(count));
		us.addUser(user);
		SitterEndpoint sP = new SitterEndpoint(cS, us);
		res = sP.regSitter(sitter);
		try {
			res = sP.finishRegSitter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		SitterDto sitterTest = null;
		try {
			sitterTest = sP.findSitter(Integer.toUnsignedLong(count));
		} catch (UnsupportedOperationException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(sitter.equals(sitterTest));
		try {
			response = cS.getClient().performRequest("DELETE", "/sitter/external/" + count,
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
