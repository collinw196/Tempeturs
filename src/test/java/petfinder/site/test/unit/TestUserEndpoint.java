package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCrypt;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.endpoint.UserEndpoint;

public class TestUserEndpoint {

	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		UserService uS = new UserService(cS);
		UserEndpoint uP = new UserEndpoint(uS);
		List<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		UserDto user = new UserDto("jack", "wild", "j_wild@wild.com", "jwild7777", "abc", "123 wilderness",
				"", "", "77777", "Texas", "5555555555", "male", "owner", "USER", list);
		try {
			uP.regUser(user);
			uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UserDto userTest = null;
		try {
			userTest = uP.findUser("jwild7777");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			cS.getClient().performRequest("DELETE", "/users/external/" + "jwild7777",
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		user.setPassword("abc");
		assertTrue(user.equals(userTest));
	}

}
