package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.elasticsearch.client.Response;
import org.junit.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserDto;
import petfinder.site.endpoint.LoginEndpoint;
import petfinder.site.endpoint.UserEndpoint;

public class TestLoginEndpoint {
	
	public static class FakeAuthenticationManager implements AuthenticationManager {

		@Override
		public Authentication authenticate(Authentication authentication) throws AuthenticationException {
			return new UsernamePasswordAuthenticationToken("user", "password");
		}
		
	}

	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		FakeAuthenticationManager fM = new FakeAuthenticationManager();
		LoginEndpoint lP = new LoginEndpoint(cS, fM);
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
		
		LoginEndpoint.LoginDto login = new LoginEndpoint.LoginDto("jwild", "abc", "owner");
		String resp = null;
		try {
			resp = lP.login(login);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			Response response = cS.getClient().performRequest("DELETE", "/users/external/" + id,
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		assertTrue(resp.equals("Success."));
	}

}
