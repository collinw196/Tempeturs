package petfinder.site.common.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	
	public UserService() {
		userDao = new UserDao();
	}
	
	public UserService(UserDao uD) {
		userDao = uD;
	}

	public UserDto getUser() {
		return userDao.getUser();
	}
	
	public void addUser(UserDto user){
		userDao.setUser(user);
	}

	public String getUsername() {
		return userDao.getUser().getUsername();
	}
}