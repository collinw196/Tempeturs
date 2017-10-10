package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.util.ArrayList;

import org.junit.Test;

import petfinder.site.common.pet.PetDto;
import petfinder.site.endpoint.PetEndpoint;

public class TestPetEndpoint {

	@Test
	public void test() {
		PetEndpoint pE = new PetEndpoint();
		PetDto pet1 = new PetDto(1L, "rodger", "dog", 4, "");
		PetDto pet2 = new PetDto(2L, "sydney", "cat", 2, "");
		ArrayList<PetDto> list = new ArrayList<PetDto>();
		list.add(pet1);
		list.add(pet2);
		pE.regPet(list);
		PetDto petTest = pE.findPet(1L);
		assertTrue(pet1.equals(petTest));
	}

}
