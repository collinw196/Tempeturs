package petfinder.site.test.unit;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import petfinder.site.CustomUserDetailService;
import petfinder.site.common.elastic.ElasticClientService;

public class TestCustomUserDetailService {
	
	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		CustomUserDetailService cusService = new CustomUserDetailService(cS);
		
		List<SimpleGrantedAuthority> authList = cusService.getAuthorities("USER");
		
		UserDetails testUser = new User("jd", "abc", authList);
		
		UserDetails user = cusService.loadUserByUsername("jd");
		assertTrue(user.equals(testUser));
	}

}
