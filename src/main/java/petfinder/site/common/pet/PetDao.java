package petfinder.site.common.pet;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.google.common.collect.ImmutableMap;

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
		this.pets = pets;		
	}
}