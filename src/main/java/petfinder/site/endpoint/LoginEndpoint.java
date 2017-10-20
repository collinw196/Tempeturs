package petfinder.site.endpoint;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 10/10/17.
 */
@RestController
@RequestMapping(value = "/api/login")
public class LoginEndpoint {
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	public LoginEndpoint(ElasticClientService cS, AuthenticationManager am) {
		clientService = cS;
		authenticationManager = am;
	}
	
	public static class LoginDto {
		private String username;
		private String password;

		public LoginDto() {
		}

		public LoginDto(String username, String password) {
			this.username = username;
			this.password = password;
		}

		public String getUsername() {
			return username;
		}

		public String getPassword() {
			return password;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public void setPassword(String password) {
			this.password = password;
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	public String login(@RequestBody LoginDto loginDto) throws IOException {		
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
		Authentication auth = authenticationManager.authenticate(token);

		SecurityContextImpl securityContext = new SecurityContextImpl();
		securityContext.setAuthentication(auth);
		SecurityContextHolder.setContext(securityContext);
		return "Success.";
	}
}