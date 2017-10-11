package petfinder.site.common.owner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

public class OwnerDao {
	@Autowired
	private OwnerDto owner;
	
	public OwnerDto findOwner(Long id) {
		return owner;
	}
	
	public void setOwner(OwnerDto owner){
		this.owner = owner;
	}
}
