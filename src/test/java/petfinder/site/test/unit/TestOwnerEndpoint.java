package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.common.owner.OwnerService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.endpoint.OwnerEndpoint;
import petfinder.site.endpoint.UserEndpoint;

public class TestOwnerEndpoint {
	
	@Test
	public void testPutOwner() {
		ElasticClientService cS = new ElasticClientService();
		UserService us = new UserService(cS);
		OwnerService oS = new OwnerService(cS, us);
		PetService ps = new PetService(oS, cS);
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
		UserEndpoint uP = new UserEndpoint(us);
		List<Integer> list2 = new ArrayList<Integer>();
		list2.add(1);
		list2.add(2);
		UserDto user = new UserDto("jack", "wild", "j_wild@wild.com", "jwild7777", "abc", "123 wilderness",
				"", "", "77777", "Texas", "5555555555", "male", "owner", "USER", list2);
		try {
			uP.regUser(user);
			uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		OwnerDto owner = new OwnerDto("jwild7777", list1, "333", "444", 2, 2020, "will");
		ps.setPets(list);
		OwnerEndpoint oP = new OwnerEndpoint(cS, us, ps, oS);
		oP.regOwner(owner);
		try {
			oP.finishRegOwner();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		OwnerDto ownerTest = null;
		try {
			ownerTest = oP.findOwner("jwild7777");
		} catch (UnsupportedOperationException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		
		try {
			cS.getClient().performRequest("DELETE", "/owner/external/" + "jwild7777",
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			cS.getClient().performRequest("DELETE", "/users/external/" + "jwild7777",
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		assertTrue(owner.equals(ownerTest));
	}
}
