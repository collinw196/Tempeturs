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
	int curCount;
	
	public PetService() {
		petDao = new PetDao();
		curCount = 0;
	}
	
	public PetService(PetDao pD) {
		petDao = pD;
		curCount = 0;
	}

	public PetDto findPet(Long id) {
		return petDao.findPet(id);
	}
	
	public void setPets (List<PetDto> pets){
		petDao.setPets(pets);
		curCount = pets.size();
	}
	
	public List<PetDto> getPets(){
		return petDao.getPets();
	}
	
	public void addPet(PetDto pet){
		petDao.addPet(pet);
		curCount++;
	}
	
	public int getCurCount(){
		return curCount;
	}
	
	public void setCurCount(int num) {
		curCount = 0;
	}
}