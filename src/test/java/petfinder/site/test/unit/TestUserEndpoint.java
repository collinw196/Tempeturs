package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.junit.Test;
import org.springframework.http.ResponseEntity;
import org.json.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserDto;
import petfinder.site.endpoint.UserEndpoint;

public class TestUserEndpoint {

	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		UserEndpoint uP = new UserEndpoint(cS);
		UserDto user = new UserDto("jack", "wild", "j_wild@wild.com", "jwild", "abc", "123 wilderness",
				"", "", "77777", "Texas", "5555555555", "male", "owner");
		ResponseEntity<String> res = null;
		int id = 0;
		try {
			res = uP.regUser(user);
			id = Integer.parseInt(res.getBody());
			res = uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UserDto userTest = null;
		try {
			userTest = uP.findUser(Integer.toUnsignedLong(id));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(user.equals(userTest));
		try {
			Response response = cS.getClient().performRequest("DELETE", "/users/external/" + id,
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
