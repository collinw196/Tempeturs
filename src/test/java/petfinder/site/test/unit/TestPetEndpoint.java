package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.elasticsearch.client.Response;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.user.UserService;
import petfinder.site.endpoint.PetEndpoint;

public class TestPetEndpoint {

	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		UserService uS = new UserService(cS);
		OwnerService oS = new OwnerService(cS, uS);
		PetService pS = new PetService(oS, cS);
		PetEndpoint pP = new PetEndpoint(cS, pS);
		PetDto pet = new PetDto("rodger", "dog", 4, "");
		PetDto pet1 = new PetDto("nick", "cat", 5, "");
		ResponseEntity<String> res = null;
		int id = 0;
		int id2 = 0;
		try {
			res = pP.regPet(pet);
			id = Integer.parseInt(res.getBody());
			res = pP.regPet(pet1);
			id2 = Integer.parseInt(res.getBody());
			pP.finishRegPet();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		pet.setId(Integer.toUnsignedLong(id));
		pet1.setId(Integer.toUnsignedLong(id2));
		
		PetDto petTest = null;
		PetDto petTest1 = null;
		try {
			petTest = pP.findPet(Integer.toUnsignedLong(id));
			petTest1 = pP.findPet(Integer.toUnsignedLong(id2));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			Response response = cS.getClient().performRequest("DELETE", "/pets/external/" + id,
					Collections.<String, String>emptyMap());
			response = cS.getClient().performRequest("DELETE", "/pets/external/" + id2,
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(pet.equals(petTest));
		assertTrue(pet1.equals(petTest1));
		
	}

}
