package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.junit.Test;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.endpoint.SitterEndpoint;

public class TestSitterEndpoint {

	@Test
	public void testGetMethods() {
		ElasticClientService cS = new ElasticClientService();
		UserService us = new UserService();
		SitterDto sitter = new SitterDto("jwild77777", "333", "444", "dog", "cat", "horse");
		UserDto user = new UserDto();
		user.setUsername("jwild77777");
		us.addUser(user);
		SitterEndpoint sP = new SitterEndpoint(cS, us);
		sP.regSitter(sitter);
		try {
			sP.finishRegSitter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		SitterDto sitterTest = null;
		try {
			sitterTest = sP.findSitter("jwild77777");
		} catch (UnsupportedOperationException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			cS.getClient().performRequest("DELETE", "/sitter/external/" + "jwild77777",
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(sitter.equals(sitterTest));
	}

}
