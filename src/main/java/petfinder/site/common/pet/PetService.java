package petfinder.site.common.pet;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class PetService {
	@Autowired
	private PetDao petDao;
	
	public PetService() {
		petDao = new PetDao();
	}
	
	public PetService(PetDao pD) {
		petDao = pD;
	}

	public PetDto findPet(Long id) {
		return petDao.findPet(id);
	}
	
	public void setPets (List<PetDto> pets){
		petDao.setPets(pets);
	}
	
	public List<PetDto> getPets(){
		return petDao.getPets();
	}
	
	public void addPet(PetDto pet){
		petDao.addPet(pet);
	}
}