package petfinder.site.common.calendar;

public class CalendarBlockDto {
	protected Long blockId;
	protected int startDay;
	protected int startMonth;
	protected int startYear;
	protected int endDay;
	protected int endMonth;
	protected int endYear;
	protected int startMin;
	protected int startHour;
	protected int endMin;
	protected int endHour;
	protected String username;
	protected int repeatStrategy;
	protected String notificationMessage;
	
	public CalendarBlockDto(){
		
	}

	public CalendarBlockDto(Long blockId, int startDay, int startMonth, int startYear, int endDay, int endMonth,
			int endYear, int startMin, int startHour, int endMin, int endHour, String username, int repeatStrategy,
			String notficationMessage) {
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
		this.notificationMessage = notficationMessage;
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
	public int getStartDay() {
		return startDay;
	}

	/**
	 * @param startDay the startDay to set
	 */
	public void setStartDay(int startDay) {
		this.startDay = startDay;
	}

	/**
	 * @return the startMonth
	 */
	public int getStartMonth() {
		return startMonth;
	}

	/**
	 * @param startMonth the startMonth to set
	 */
	public void setStartMonth(int startMonth) {
		this.startMonth = startMonth;
	}

	/**
	 * @return the startYear
	 */
	public int getStartYear() {
		return startYear;
	}

	/**
	 * @param startYear the startYear to set
	 */
	public void setStartYear(int startYear) {
		this.startYear = startYear;
	}

	/**
	 * @return the endDay
	 */
	public int getEndDay() {
		return endDay;
	}

	/**
	 * @param endDay the endDay to set
	 */
	public void setEndDay(int endDay) {
		this.endDay = endDay;
	}

	/**
	 * @return the endMonth
	 */
	public int getEndMonth() {
		return endMonth;
	}

	/**
	 * @param endMonth the endMonth to set
	 */
	public void setEndMonth(int endMonth) {
		this.endMonth = endMonth;
	}

	/**
	 * @return the endYear
	 */
	public int getEndYear() {
		return endYear;
	}

	/**
	 * @param endYear the endYear to set
	 */
	public void setEndYear(int endYear) {
		this.endYear = endYear;
	}

	/**
	 * @return the startMin
	 */
	public int getStartMin() {
		return startMin;
	}

	/**
	 * @param startMin the startMin to set
	 */
	public void setStartMin(int startMin) {
		this.startMin = startMin;
	}

	/**
	 * @return the startHour
	 */
	public int getStartHour() {
		return startHour;
	}

	/**
	 * @param startHour the startHour to set
	 */
	public void setStartHour(int startHour) {
		this.startHour = startHour;
	}

	/**
	 * @return the endMin
	 */
	public int getEndMin() {
		return endMin;
	}

	/**
	 * @param endMin the endMin to set
	 */
	public void setEndMin(int endMin) {
		this.endMin = endMin;
	}

	/**
	 * @return the endHour
	 */
	public int getEndHour() {
		return endHour;
	}

	/**
	 * @param endHour the endHour to set
	 */
	public void setEndHour(int endHour) {
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

	/**
	 * @return the notificationMessage
	 */
	public String getNotificationMessage() {
		return notificationMessage;
	}

	/**
	 * @param notificationMessage the notificationMessage to set
	 */
	public void setNotificationMessage(String notificationMessage) {
		this.notificationMessage = notificationMessage;
	}
	
	
	
}
