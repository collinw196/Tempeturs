package petfinder.site.common.owner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public class OwnerDao {
	private OwnerDto owner;
	
	public OwnerDto findOwner(Long id) {
		return owner;
	}
	
	public void setOwner(OwnerDto owner){
		this.owner = owner;
	}
}
