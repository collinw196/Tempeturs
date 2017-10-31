package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.endpoint.OwnerEndpoint;

public class TestOwnerEndpoint {
	
	@Test
	public void testPutOwner() {
		ElasticClientService cS = new ElasticClientService();
		UserService us= new UserService(cS);
		PetService ps = new PetService();
		List<PetDto> list = new ArrayList<PetDto>();
		PetDto pet1 = new PetDto();
		PetDto pet2 = new PetDto();
		pet1.setId(1L);
		pet2.setId(2L);
		list.add(pet1);
		list.add(pet2);
		List<Integer> list1 = new ArrayList<Integer>();
		list1.add(1);
		list1.add(2);
		OwnerDto owner = new OwnerDto("jwild77777", list1, "333", "444", 2, 2020, "will");
		UserDto user = new UserDto();
		user.setUsername("jwild77777");
		us.addUser(user);
		ps.setPets(list);
		OwnerEndpoint oP = new OwnerEndpoint(cS, us, ps);
		oP.regOwner(owner);
		try {
			oP.finishRegOwner();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		OwnerDto ownerTest = null;
		try {
			ownerTest = oP.findOwner("jwild77777");
		} catch (UnsupportedOperationException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		
		try {
			cS.getClient().performRequest("DELETE", "/owner/external/" + "jwild77777",
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		assertTrue(owner.equals(ownerTest));
	}
}
