package petfinder.site.test.unit;

import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.ParseException;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import petfinder.site.common.calendar.CalendarAppointmentDto;
import petfinder.site.common.calendar.CalendarBlockDto;
import petfinder.site.common.calendar.CalendarService;
import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.owner.OwnerDto;
import petfinder.site.common.owner.OwnerService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.pet.PetService;
import petfinder.site.common.sitter.SitterDto;
import petfinder.site.common.sitter.SitterSearchFilter;
import petfinder.site.common.sitter.SitterService;
import petfinder.site.common.user.UserDto;
import petfinder.site.common.user.UserService;
import petfinder.site.endpoint.OwnerEndpoint;
import petfinder.site.endpoint.PetEndpoint;
import petfinder.site.endpoint.SitterEndpoint;
import petfinder.site.endpoint.UserEndpoint;

public class TestFunctionalFlow {
	
	/*@Test
	public void testOwnerFunctionality() {
		ElasticClientService cS = new ElasticClientService();
		OwnerService oS = new OwnerService();
		SitterService sS = new SitterService(cS);
		PetService pS = new PetService();
		UserService uS = new UserService(cS);
		UserEndpoint uP = new UserEndpoint(uS);
		PetEndpoint pP = new PetEndpoint(cS, pS);
		CalendarService clS = new CalendarService(cS);
		SitterEndpoint sP = new SitterEndpoint(cS, uS, sS, clS);
		OwnerEndpoint oP = new OwnerEndpoint(cS, uS, pS, oS, clS, sS, pP);
		List<Integer> list = new ArrayList<Integer>();
		UserDto user = new UserDto("jimmy", "wall", "j_wall@wild.com", "jwall77777", "abc", "123 wilderness",
				"", "", "77777", "Texas", "5555555555", "male", "sitter", "USER", list);
		try {
			uP.regUser(user);
			uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block	
			e.printStackTrace();
		}
		
		SitterDto sitter1 = new SitterDto("jwall77777", "333", "444", "dog", "cat", "horse", 0, "77777");
		sP.regSitter(sitter1);
		try {
			sP.finishRegSitter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		user = new UserDto("craig", "peters", "c_pete@wild.com", "cpeter77775", "abc", "123 wilderness",
				"", "", "77775", "Texas", "5555555555", "male", "sitter", "USER", list);
		try {
			uP.regUser(user);
			uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block	
			e.printStackTrace();
		}
		
		SitterDto sitter2 = new SitterDto("cpeter77775", "333", "444", "cat", "dog", "horse", 0, "77775");
		sP.regSitter(sitter2);
		try {
			sP.finishRegSitter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		user = new UserDto("mike", "cave", "m_cav@wild.com", "mc86775", "abc", "123 wilderness",
				"", "", "86775", "Texas", "5555555555", "male", "sitter", "USER", list);
		try {
			uP.regUser(user);
			uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block	
			e.printStackTrace();
		}
		
		SitterDto sitter3 = new SitterDto("mc86775", "333", "444", "horse", "dog", "cat", 0, "86775");
		sP.regSitter(sitter3);
		try {
			sP.finishRegSitter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	
		
		
		
		
		
		user = new UserDto("jack", "wild", "j_wild@wild.com", "jwild77777", "abc", "123 wilderness",
				"", "", "77777", "Texas", "5555555555", "male", "owner", "USER", list);
		try {
			uP.regUser(user);
			uP.finishRegUser();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PetDto pet1 = new PetDto("rodger", "dog", 4, "");
		PetDto pet2 = new PetDto("nick", "cat", 5, "");
		ResponseEntity<String> res = null;
		int id = 0;
		int id2 = 0;
		try {
			res = pP.regPet(pet1);
			id = Integer.parseInt(res.getBody());
			res = pP.regPet(pet2);
			id2 = Integer.parseInt(res.getBody());
			pP.finishRegPet();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		pet1.setId(Integer.toUnsignedLong(id));
		pet2.setId(Integer.toUnsignedLong(id2));
		
		
		List<Integer> list1 = new ArrayList<Integer>();
		list1.add(1);
		list1.add(2);
		OwnerDto owner = new OwnerDto("jwild77777", list1, "333", "444", 2, 2020, "will");
		oP.regOwner(owner);
		try {
			oP.finishRegOwner();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		List<Integer> petIds = new ArrayList<Integer>();
		petIds.add(pet1.getId().intValue());
		CalendarAppointmentDto appointment = new CalendarAppointmentDto(20, 11, 2017, 21, 11,
				2017, 00, 20, 00, 10, "jwall77777", 0, "This appointment was created needs to be accepted", "Appt", "jwild77777", petIds, "NOT ACCEPTED",
				"SCHEDULED", "", "casual", 50.00);
		try {
			List<SitterDto> sitterList = oP.sortSitters(0, appointment);
			assertTrue(sitterList.get(0).equals(sitter1));
			assertTrue(sitterList.get(1).equals(sitter2));
			assertTrue(sitterList.get(2).equals(sitter3));	
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		try {
			oP.requestSitter(appointment);
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			List<CalendarAppointmentDto> appointmentList = oP.getAppointments();
			assertTrue(appointmentList.get(0).equals(appointment));
			appointmentList = oP.getNotifications();
			assertTrue(appointmentList.get(0).equals(appointment));
			oP.cancelSitter(appointmentList.get(0).getBlockId().intValue());
			appointmentList = oP.getAppointments();
			assertTrue(appointmentList.size() == 0);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PetDto pet3 = new PetDto("mike", "dog", 5, "");
		try {
			res = oP.addPet(pet3);
			id = Integer.parseInt(res.getBody());
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		pet3.setId(Integer.toUnsignedLong(id));
		
		petIds.clear();
		petIds.add(pet3.getId().intValue());
		
		appointment = new CalendarAppointmentDto(20, 11, 2017, 21, 11,
				2017, 00, 20, 00, 10, "jwall77777", 0, "This appointment was created needs to be accepted", "Appt", "jwild77777", petIds, "NOT ACCEPTED",
				"SCHEDULED", "", "casual", 50.00);
		
		try {
			SitterSearchFilter filter = new SitterSearchFilter();
			filter.setTopPreference("dog");
			oP.setFilter(filter);
			List<SitterDto> sitterList = oP.sortSitters(0, appointment);
			assertTrue(sitterList.get(0).equals(sitter1));			
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		try {
			oP.requestSitter(appointment);
			List<CalendarAppointmentDto> appointmentList = oP.getAppointments();
			oP.paySitter(appointmentList.get(0).getBlockId().intValue());
			appointmentList = oP.getNotifications();
			assertTrue(appointmentList.get(0).getAppointmentStatus().equals("PAYED"));
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		appointment = new CalendarAppointmentDto(20, 11, 2018, 21, 11,
				2018, 00, 20, 00, 10, "cpeter77775", 0, "This appointment was created needs to be accepted", "Appt", "jwild77777", petIds, "NOT ACCEPTED",
				"SCHEDULED", "", "casual", 50.00);
		try {
			uS.updateService("cpeter77775");
			sS.updateService("cpeter77775");
			oP.requestSitter(appointment);
			List<CalendarBlockDto> appointmentList = sP.getAppointments();
			sP.acceptAppt(appointmentList.get(0).getBlockId().intValue());
			List<CalendarAppointmentDto> notList = sP.getApptNotifications();
			sP.getRatNotifications();
			assertTrue(notList.get(0).getAppointmentStatus().equals("ACCEPTED"));
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			List<CalendarBlockDto> appointmentList = sP.getAppointments();
			sP.denyAppt(appointmentList.get(0).getBlockId().intValue());
			List<CalendarAppointmentDto> notList = sP.getApptNotifications();
			sP.getRatNotifications();
			assertTrue(notList.get(0).getAppointmentStatus().equals("REFUSED"));
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			sP.rateSitter("cpeter77775", 3.0);
			sP.getApptNotifications();
			List<String> appointmentList = sP.getRatNotifications();
			assertTrue(appointmentList.get(0).equals("You were given a 3 rating!"));
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		CalendarBlockDto block = new CalendarBlockDto(20, 11, 2019, 21, 11,
				2019, 00, 20, 00, 10, "cpeter77775", 0, "", "Block");
		CalendarAppointmentDto app = new CalendarAppointmentDto(20, 11, 2019, 21, 11,
				2019, 00, 20, 00, 10, "cpeter77775", 0, "Block has been created", "Block");
		try {
			uS.updateService("cpeter77775");
			sS.updateService("cpeter77775");
			oP.requestSitter(appointment);
			sP.createBlock(block);
			List<CalendarBlockDto> appointmentList = sP.getAppointments();
			assertTrue(appointmentList.get(0).equals(appointment));
			app.setBlockId(appointmentList.get(1).getBlockId());
			assertTrue(appointmentList.get(1).equals(app));
		} catch (ParseException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}*/
}
