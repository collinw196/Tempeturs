package petfinder.site.common.pet;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Repository
public class PetDao {
	
	private List<PetDto> pets;

	public PetDto findPet(Long id) {
		for (PetDto pet : pets){
			if(pet.getId() == id){
				return pet;
			}
		}
		return null;
	}

	public List<PetDto> getPets() {
		return pets;
	}

	public void setPets(List<PetDto> pets) {
		for (PetDto pet : pets){
			pets.add(pet);
		}
		
	}
}