package petfinder.site.common.calendar;

import java.util.Comparator;

public class AppointmentComparator implements Comparator<CalendarBlockDto> {

	@Override
	public int compare(CalendarBlockDto arg0, CalendarBlockDto arg1) {
		int comp;
		if(arg0.getStartYear() == arg1.getStartYear()){
			if(arg0.getStartMonth() == arg1.getStartMonth()){
				if(arg0.getStartDay() == arg1.getStartDay()){
					if(arg0.getStartHour() == arg1.getStartHour()){
						if(arg0.getStartMin() == arg1.getStartMin()){
							comp = -1;
						} else if (arg0.getStartMin() < arg1.getStartMin()){
							comp = -1;
						}
						else {
							comp = 1;
						}
					} else if (arg0.getStartHour() < arg1.getStartHour()){
						comp = -1;
					}
					else {
						comp = 1;
					}
				} else if (arg0.getStartDay() < arg1.getStartDay()){
					comp = -1;
				}
				else {
					comp = 1;
				}
			} else if (arg0.getStartMonth() < arg1.getStartMonth()){
				comp = -1;
			}
			else {
				comp = 1;
			}
		} else if (arg0.getStartYear() < arg1.getStartYear()){
			comp = -1;
		}
		else {
			comp = 1;
		}
		
		return comp;
	}

}
