package petfinder.site.common.user;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class UserDao {
	private UserDto user;

	public UserDto getUser() {
		return user;
		//return Optional.ofNullable(user.get(id));
	}
	
	public void setUser(UserDto user){
		this.user = user;
	}
}