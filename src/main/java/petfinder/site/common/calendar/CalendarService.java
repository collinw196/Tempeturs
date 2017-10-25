package petfinder.site.common.calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Created by mattdulany.
 */
@Service
public class CalendarService {
	@Autowired
	private CalendarAppointmentDao appointmentDao;
	@Autowired
	private CalendarBlockDao blockDao;
	
	public CalendarService() {
		appointmentDao = new CalendarAppointmentDao();
		blockDao = new CalendarBlockDao();
	}
	
	public CalendarService(CalendarAppointmentDao cAD, CalendarBlockDao cBD) {
		appointmentDao = cAD;
		blockDao = cBD;
	}

	public CalendarBlockDto getAppointment() {
		return appointmentDao.getAppointment();
	}
	
	public CalendarBlockDto getBlock() {
		return blockDao.getBlock();
	}
	
	public void addAppointment(CalendarAppointmentDto appointment){
		appointmentDao.setAppointment(appointment);
	}
	
	public void addBlock(CalendarBlockDto block){
		blockDao.setBlock(block);
	}
}
