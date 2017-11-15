package petfinder.site.common.pet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerService;

/**
 * Created by jlutteringer on 8/23/17.
 */
@Service
public class PetService {
	@Autowired
	private PetDao petDao;
	@Autowired
	private OwnerService ownerService;
	@Autowired
	private ElasticClientService clientService;
	@Autowired
	private ObjectMapper objectMapper;
	int curCount;
	
	public PetService(){
		curCount = 0;
	}
	
	public PetService(OwnerService oS, ElasticClientService cS) {
		petDao = new PetDao();
		objectMapper = new ObjectMapper();
		clientService = cS;
		ownerService = oS;
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
	
	public void emptyList(){
		petDao.emptyList();
		setCurCount(0);
	}

	public List<Integer> getPetIds() {
		List<Integer> list = new ArrayList<Integer>();
		for (PetDto pet : petDao.getPets()){
			list.add(pet.getId().intValue());
		}
		return list;
	}
	
	public void updateService () throws ParseException, IOException{
		for(int id : ownerService.getOwner().getPetIds()){
			Response response = clientService.getClient().performRequest("GET", "/pets/external/" + id + "/_source",
			        Collections.singletonMap("pretty", "true"));
			
			String jsonString = EntityUtils.toString(response.getEntity());
			
			PetDto pet = objectMapper.readValue(jsonString, PetDto.class);
			addPet(pet);
		}
	}
}