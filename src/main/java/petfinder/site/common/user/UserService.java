package petfinder.site.common.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import petfinder.site.common.pet.PetDao;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class UserService {
	private UserDao userDao;
	
	public UserService() {
		userDao = new UserDao();
	}
	
	public UserService(UserDao uD) {
		userDao = uD;
	}

	public UserDto findUser(Long id) {
		return userDao.findUser(id);
	}
	
	public void addUser(UserDto user){
		userDao.setUser(user);
	}
}