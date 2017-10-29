package petfinder.site.common.sitter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Created by mattdulany.
 */
@Service
public class SitterService {
	@Autowired
	private SitterDao sitterDao;
	@Autowired
	private SitterSearchFilter filter;
	
	public SitterService() {
		sitterDao = new SitterDao();
		filter = new SitterSearchFilter();
	}
	
	public SitterService(SitterDao sD) {
		sitterDao = sD;
	}

	public SitterDto getSitter() {
		return sitterDao.getSitter();
	}
	
	public void addSitter(SitterDto sitter){
		sitterDao.setSitter(sitter);
	}

	public SitterSearchFilter getFilter() {
		return filter;
	}

	public void setFilter(SitterSearchFilter filter) {
		this.filter = filter;
	}
}
	
