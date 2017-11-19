package petfinder.site.test.unit;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import petfinder.site.common.calendar.CalendarAppointmentDto;
import petfinder.site.common.calendar.CalendarService;
import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.sitter.SitterDto;

public class TestFunction {
	
	/*@Test
	public void test() {
		List<Integer> petIds = new ArrayList<Integer>();
		petIds.add(2);
		CalendarAppointmentDto appointment = new CalendarAppointmentDto(19, 11, 2017, 19, 11,
				2017, 00, 15, 00, 20, "", 0, "This appointment was created needs to be accepted", "Appt", "jwild77777", petIds,
				"SCHEDULED", "", "casual", 50.00);
		SitterDto sitter = new SitterDto("jwall77777", "", "", "", "", "", 2.0, "77777");
		ElasticClientService cS = new ElasticClientService();
		CalendarService ccS = new CalendarService(cS);
		boolean isFree = false;
		try {
			isFree = ccS.isFree(sitter, appointment);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		assertTrue(isFree == true);
	}*/

}
