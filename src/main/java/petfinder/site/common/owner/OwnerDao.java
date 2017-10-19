package petfinder.site.common.owner;


import org.springframework.stereotype.Repository;

@Repository
public class OwnerDao {
	private OwnerDto owner;
	
	public OwnerDto getOwner() {
		return owner;
	}
	
	public void setOwner(OwnerDto owner){
		this.owner = owner;
	}
}
