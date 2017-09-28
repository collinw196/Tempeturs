package petfinder.site.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.sitter.SitterDto;

/**
 * Created by mattdulany.
 */
@RestController
@RequestMapping(value = "/api/pet")
public class PetEndpoint {
	@Autowired
	private PetService petService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public PetDto findOwner(@PathVariable(name = "id") Long id) {
		return petService.findPet(id);
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regSitter(@RequestBody List<PetDto> pets) {
		petService.setPets(pets);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}