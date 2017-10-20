package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.junit.Test;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserDto;
import petfinder.site.endpoint.UserEndpoint;

public class TestUserEndpoint {

	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		UserEndpoint uP = new UserEndpoint(cS);
		UserDto user = new UserDto("jack", "wild", "j_wild@wild.com", "jwild77777", "abc", "123 wilderness",
				"", "", "77777", "Texas", "5555555555", "male", "owner");
		try {
			uP.regUser(user);
			uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UserDto userTest = null;
		try {
			userTest = uP.findUser("jwild77777");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			cS.getClient().performRequest("DELETE", "/users/external/" + "jwild77777",
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		assertTrue(user.equals(userTest));
	}

}
