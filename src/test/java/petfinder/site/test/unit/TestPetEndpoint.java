package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.Collections;

import org.elasticsearch.client.Response;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.endpoint.PetEndpoint;

public class TestPetEndpoint {

	@Test
	public void test() {
		ElasticClientService cS = new ElasticClientService();
		PetEndpoint pP = new PetEndpoint(cS);
		PetDto pet = new PetDto("rodger", "dog", 4, "");
		ResponseEntity<String> res = null;
		int id = 0;
		try {
			res = pP.regPet(pet);
			id = Integer.parseInt(res.getBody());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PetDto petTest = null;
		try {
			petTest = pP.findPet(Integer.toUnsignedLong(id));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(pet.equals(petTest));
		try {
			Response response = cS.getClient().performRequest("DELETE", "/pets/external/" + id,
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
