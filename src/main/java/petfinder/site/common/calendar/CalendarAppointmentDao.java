package petfinder.site.common.calendar;

import org.springframework.stereotype.Repository;

@Repository
public class CalendarAppointmentDao {
	private CalendarBlockDto appointment;
	
	public CalendarBlockDto getAppointment() {
		return appointment;
		//return Optional.ofNullable(user.get(id));
	}
	
	public void setAppointment(CalendarAppointmentDto appointment){
		this.appointment = appointment;
	}
}
