package petfinder.site.common.calendar;

public class CalendarBlockDto {
	protected Long blockId;
	protected String startDay;
	protected String startMonth;
	protected String startYear;
	protected String endDay;
	protected String endMonth;
	protected String endYear;
	protected String startMin;
	protected String startHour;
	protected String endMin;
	protected String endHour;
	protected String username;
	protected int repeatStrategy;
	
	public CalendarBlockDto(){
		
	}
	
	public CalendarBlockDto(Long blockId, String startDay, String startMonth, String startYear, String endDay,
			String endMonth, String endYear, String startMin, String startHour, String endMin, String endHour,
			String username, int repeatStrategy) {
		super();
		this.blockId = blockId;
		this.startDay = startDay;
		this.startMonth = startMonth;
		this.startYear = startYear;
		this.endDay = endDay;
		this.endMonth = endMonth;
		this.endYear = endYear;
		this.startMin = startMin;
		this.startHour = startHour;
		this.endMin = endMin;
		this.endHour = endHour;
		this.username = username;
		this.repeatStrategy = repeatStrategy;
	}
	
	
	/**
	 * @return the blockId
	 */
	public Long getBlockId() {
		return blockId;
	}
	/**
	 * @param blockId the blockId to set
	 */
	public void setBlockId(Long blockId) {
		this.blockId = blockId;
	}
	/**
	 * @return the startDay
	 */
	public String getStartDay() {
		return startDay;
	}
	/**
	 * @param startDay the startDay to set
	 */
	public void setStartDay(String startDay) {
		this.startDay = startDay;
	}
	/**
	 * @return the startMonth
	 */
	public String getStartMonth() {
		return startMonth;
	}
	/**
	 * @param startMonth the startMonth to set
	 */
	public void setStartMonth(String startMonth) {
		this.startMonth = startMonth;
	}
	/**
	 * @return the startYear
	 */
	public String getStartYear() {
		return startYear;
	}
	/**
	 * @param startYear the startYear to set
	 */
	public void setStartYear(String startYear) {
		this.startYear = startYear;
	}
	/**
	 * @return the endDay
	 */
	public String getEndDay() {
		return endDay;
	}
	/**
	 * @param endDay the endDay to set
	 */
	public void setEndDay(String endDay) {
		this.endDay = endDay;
	}
	/**
	 * @return the endMonth
	 */
	public String getEndMonth() {
		return endMonth;
	}
	/**
	 * @param endMonth the endMonth to set
	 */
	public void setEndMonth(String endMonth) {
		this.endMonth = endMonth;
	}
	/**
	 * @return the endYear
	 */
	public String getEndYear() {
		return endYear;
	}
	/**
	 * @param endYear the endYear to set
	 */
	public void setEndYear(String endYear) {
		this.endYear = endYear;
	}
	/**
	 * @return the startMin
	 */
	public String getStartMin() {
		return startMin;
	}
	/**
	 * @param startMin the startMin to set
	 */
	public void setStartMin(String startMin) {
		this.startMin = startMin;
	}
	/**
	 * @return the startHour
	 */
	public String getStartHour() {
		return startHour;
	}
	/**
	 * @param startHour the startHour to set
	 */
	public void setStartHour(String startHour) {
		this.startHour = startHour;
	}
	/**
	 * @return the endMin
	 */
	public String getEndMin() {
		return endMin;
	}
	/**
	 * @param endMin the endMin to set
	 */
	public void setEndMin(String endMin) {
		this.endMin = endMin;
	}
	/**
	 * @return the endHour
	 */
	public String getEndHour() {
		return endHour;
	}
	/**
	 * @param endHour the endHour to set
	 */
	public void setEndHour(String endHour) {
		this.endHour = endHour;
	}
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return the repeatStrategy
	 */
	public int getRepeatStrategy() {
		return repeatStrategy;
	}
	/**
	 * @param repeatStrategy the repeatStrategy to set
	 */
	public void setRepeatStrategy(int repeatStrategy) {
		this.repeatStrategy = repeatStrategy;
	}
	
}
