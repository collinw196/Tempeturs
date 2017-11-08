package petfinder.site;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.user.UserDto;

@Service("userDetailsService")
public class CustomUserDetailService implements UserDetailsService {
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("\n\nFirst Stop\n\n");
		SearchRequest searchRequest = new SearchRequest("users"); 
		searchRequest.types("external");
		BoolQueryBuilder boolQuery = new BoolQueryBuilder();
		boolQuery.must(QueryBuilders.matchQuery("username", username));
		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); 
		sourceBuilder.query(boolQuery); 
		sourceBuilder.from(0); 
		sourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
		SearchResponse response = null;
		try {
			response = clientService.getHighClient().search(searchRequest);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(response.getHits().getTotalHits() == 0){
			throw new BadCredentialsException("Username and password not recognized");
		}
		
		System.out.println("\n\n 2 Stop\n\n");
		JSONObject json = new JSONObject(response.toString());
		JSONObject firstHits = json.getJSONObject("hits");
		System.out.println("\n\n 3 Stop\n\n");
		JSONObject secondHits = firstHits.getJSONObject("hits");
		JSONObject source = secondHits.getJSONObject("_source");
		System.out.println("\n\n 4 Stop\n\n");
		String jsonString = source.toString();
		UserDto user = null;
		
		try {
			user = objectMapper.readValue(jsonString, UserDto.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        String role = user.getRole();
 
        List<SimpleGrantedAuthority> authList = getAuthorities(role);
        
        UserDetails authUser = new User(user.getUsername(), user.getPassword(), authList);
        
        System.out.println("\n\n Third Stop\n\n");
		
        return authUser;
	}
	
	private List<SimpleGrantedAuthority> getAuthorities(String role) {
        List<SimpleGrantedAuthority> authList = new ArrayList<>();
        authList.add(new SimpleGrantedAuthority("ROLE_USER"));
 
        //you can also add different roles here
        //for example, the user is also an admin of the site, then you can add ROLE_ADMIN
        //so that he can view pages that are ROLE_ADMIN specific
        if (role != null && role.trim().length() > 0) {
            if (role.equals("ADMIN")) {
                authList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            }
        }
 
        return authList;
    }

}
