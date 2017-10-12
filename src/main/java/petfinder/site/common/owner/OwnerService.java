package petfinder.site.common.owner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class OwnerService {
	@Autowired
	private OwnerDao ownerDao;
	
	public OwnerService (){
		ownerDao = new OwnerDao();
	}

	public OwnerDto getOwner() {
		return ownerDao.getOwner();
	}
	
	public void setOwner(OwnerDto owner){
		ownerDao.setOwner(owner);
	}
}