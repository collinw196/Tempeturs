package petfinder.site.endpoint;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.apache.http.HttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Response;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.elastic.ElasticClientService;

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
		private String type;

		public LoginDto() {
		}

		public LoginDto(String username, String password, String type) {
			this.username = username;
			this.password = password;
			this.type = type;
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

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	public String login(@RequestBody LoginDto loginDto) throws IOException {	
		SearchRequest searchRequest = new SearchRequest("users"); 
		searchRequest.types("external");
		BoolQueryBuilder boolQuery = new BoolQueryBuilder();
		boolQuery.must(QueryBuilders.matchQuery("username", loginDto.getUsername()));
		boolQuery.must(QueryBuilders.matchQuery("password", loginDto.getPassword()));
		boolQuery.must(QueryBuilders.matchQuery("type", loginDto.getType()));
		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); 
		sourceBuilder.query(boolQuery); 
		sourceBuilder.from(0); 
		sourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
		SearchResponse response = clientService.getHighClient().search(searchRequest);
		
		JSONObject json = new JSONObject(response.toString());
		JSONObject jsonHits = json.getJSONObject("hits");
		int count = jsonHits.getInt("total");
		if(count == 1){
			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken("user", "password");
			Authentication auth = authenticationManager.authenticate(token);

			SecurityContextImpl securityContext = new SecurityContextImpl();
			securityContext.setAuthentication(auth);
			SecurityContextHolder.setContext(securityContext);
			return "Success.";
		}
		else{
			return "Failure.";
		}
	}
}