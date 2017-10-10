package petfinder.site.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import petfinder.site.common.pet.PetService;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.sitter.SitterService;
import petfinder.site.common.user.UserDto;

/**
 * Created by mattdulany on 9/27/2017.
 */
@RestController
@RequestMapping(value = "/api/sitter")
public class SitterEndpoint {
	
	private SitterService sitterService;
	
	public SitterEndpoint(){
		sitterService = new SitterService();
	}
	
	public SitterEndpoint(SitterService sS){
		sitterService = sS;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public SitterDto findSitter(@PathVariable(name = "id") Long id) {
		return sitterService.findSitter(id);
	}
	
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
	public ResponseEntity<String> regSitter(@RequestBody SitterDto sitter) {
		sitterService.addSitter(sitter);
		return new ResponseEntity<String>("Added", HttpStatus.OK);
	}
}
