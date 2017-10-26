package petfinder.site.common.calendar;

import org.springframework.stereotype.Repository;

@Repository
public class CalendarBlockDao {
	private CalendarBlockDto block;
	
	public CalendarBlockDto getBlock() {
		return block;
		//return Optional.ofNullable(user.get(id));
	}
	
	public void setBlock(CalendarBlockDto block){
		this.block = block;
	}
}
