package petfinder.site.common.sitter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by mattdulany.
 */
@Service
public class SitterService {
	
	private SitterDao sitterDao;
	
	public SitterService() {
		sitterDao = new SitterDao();
	}

	public SitterDto findSitter(Long id) {
		return sitterDao.findSitter(id);
	}
	
	public void addSitter(SitterDto sitter){
		sitterDao.setSitter(sitter);
	}
}
	
