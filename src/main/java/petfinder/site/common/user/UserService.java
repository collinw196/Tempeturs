package petfinder.site.common.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {
	private UserDao userDao;
	
	public UserService() {
		userDao = new UserDao();
	}

	public UserDto findUser(Long id) {
		return userDao.findUser(id);
	}
	
	public void addUser(UserDto user){
		userDao.setUser(user);
	}
}