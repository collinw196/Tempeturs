package petfinder.site.common.owner;

import org.springframework.stereotype.Service;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class OwnerService {
	private OwnerDao ownerDao;

	public OwnerDto findOwner(Long id) {
		return ownerDao.findOwner(id);
	}
	
	public void setOwner(OwnerDto owner){
		ownerDao.setOwner(owner);
	}
}