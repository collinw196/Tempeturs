package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.http.ParseException;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.json.JSONObject;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.endpoint.OwnerEndpoint;

public class TestOwnerEndpoint {
	
	@Test
	public void testPutOwner() {
		ElasticClientService cS = new ElasticClientService();
		OwnerEndpoint oP = new OwnerEndpoint(cS);
		List<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		Response response = null;
		try {
			response = cS.getClient().performRequest("GET", "/owner/external/_count",
					Collections.<String, String>emptyMap());
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		String jsonString1 = null;
		try {
			jsonString1 = EntityUtils.toString(response.getEntity());
		} catch (ParseException | IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		JSONObject json = new JSONObject(jsonString1);
        int count = json.getInt("count");
		OwnerDto owner = new OwnerDto(count, list, "333", "444", 2, 2020, "will");
		ResponseEntity<String> res = null;
		try {
			res = oP.regOwner(owner);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		OwnerDto ownerTest = null;
		try {
			ownerTest = oP.findOwner(Integer.toUnsignedLong(count));
		} catch (UnsupportedOperationException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		
		assertTrue(owner.equals(ownerTest));
		try {
			response = cS.getClient().performRequest("DELETE", "/owner/external/" + count,
					Collections.<String, String>emptyMap());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

}
