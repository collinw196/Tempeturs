package petfinder.site.test.unit;

import static org.junit.Assert.*;

import org.junit.Test;

import petfinder.site.common.user.UserDto;
import petfinder.site.endpoint.UserEndpoint;

public class TestUserEndpoint {

	@Test
	public void test() {
		UserEndpoint uE = new UserEndpoint();
		UserDto user = new UserDto("Jack", "Wilder", "jack_wilder@wilderness.com", "jwild",
				"abc", "123 Outside", "", "", "76777", 
				"Texas", "5555555555", "male", "owner");
		uE.regUser(user);
		System.out.println("\n\n\nHowdy\n\n\n");
		UserDto userTest = uE.findUser(1L);
		user.setId(1L);
		assertEquals(user, userTest);
	}

}
