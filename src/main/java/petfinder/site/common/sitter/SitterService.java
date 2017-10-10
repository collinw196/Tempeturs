package petfinder.site.common.sitter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import petfinder.site.common.pet.PetDao;

/**
 * Created by mattdulany.
 */
@Service
public class SitterService {
	
	private SitterDao sitterDao;
	
	public SitterService() {
		sitterDao = new SitterDao();
	}
	
	public SitterService(SitterDao sD) {
		sitterDao = sD;
	}

	public SitterDto findSitter(Long id) {
		return sitterDao.findSitter(id);
	}
	
	public void addSitter(SitterDto sitter){
		sitterDao.setSitter(sitter);
	}
}
	
