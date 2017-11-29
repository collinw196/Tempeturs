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
				2017, 00, 15, 00, 20, "", 1, "This appointment was created needs to be accepted", "Appt", "jwild77777", petIds,
				"SCHEDULED", "", "casual", 50.00);
		
		CalendarAppointmentDto testAppointment = new CalendarAppointmentDto(appointment);
		CalendarAppointmentDto testAppointment2 = new CalendarAppointmentDto(appointment);
		CalendarAppointmentDto testAppointment3 = new CalendarAppointmentDto(appointment);
		testAppointment.addWeek(1);
		testAppointment2.addWeek(2);
		testAppointment3.addWeek(3);
		
		System.out.println(appointment.toString());
		System.out.println(testAppointment.toString());
		System.out.println(testAppointment2.toString());
		System.out.println(testAppointment3.toString());		
	}*/

}
