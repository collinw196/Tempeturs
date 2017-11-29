package petfinder.site.common.calendar;

public class CalendarBlockDto {

	private Long blockId;
	private int startDay;
	private int startMonth;
	private int startYear;
	private int endDay;
	private int endMonth;
	private int endYear;
	private int startMin;
	private int startHour;
	private int endMin;
	private int endHour;
	private String username; // always the sitter username
	private int repeatStrategy;
	private String notificationMessage;
	private String type;
	
	public CalendarBlockDto(){
		
	}

	public CalendarBlockDto(int startDay, int startMonth, int startYear, int endDay, int endMonth,
			int endYear, int startMin, int startHour, int endMin, int endHour, String username, int repeatStrategy,
			String notficationMessage, String type) {
		super();
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
		this.type = type;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CalendarBlockDto other = (CalendarBlockDto) obj;
		if (blockId == null) {
			if (other.blockId != null)
				return false;
		} else if (!blockId.equals(other.blockId))
			return false;
		if (endDay != other.endDay)
			return false;
		if (endHour != other.endHour)
			return false;
		if (endMin != other.endMin)
			return false;
		if (endMonth != other.endMonth)
			return false;
		if (endYear != other.endYear)
			return false;
		if (notificationMessage == null) {
			if (other.notificationMessage != null)
				return false;
		} else if (!notificationMessage.equals(other.notificationMessage))
			return false;
		if (repeatStrategy != other.repeatStrategy)
			return false;
		if (startDay != other.startDay)
			return false;
		if (startHour != other.startHour)
			return false;
		if (startMin != other.startMin)
			return false;
		if (startMonth != other.startMonth)
			return false;
		if (startYear != other.startYear)
			return false;
		if (type == null) {
			if (other.type != null)
				return false;
		} else if (!type.equals(other.type))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "CalendarBlockDto [blockId=" + blockId + ", startDay=" + startDay + ", startMonth=" + startMonth
				+ ", startYear=" + startYear + ", endDay=" + endDay + ", endMonth=" + endMonth + ", endYear=" + endYear
				+ ", startMin=" + startMin + ", startHour=" + startHour + ", endMin=" + endMin + ", endHour=" + endHour
				+ ", username=" + username + ", repeatStrategy=" + repeatStrategy + ", notificationMessage="
				+ notificationMessage + ", type=" + type + "]";
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	public void addWeek(int increment) {
		int monthArray[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
		int numDays = getRepeatStrategy() * 7 * increment;
		int sDay = getStartDay();
		int eDay = getEndDay();
		int sMonth = getStartMonth();
		int eMonth = getEndMonth();
		int sYear = getStartYear();
		int eYear = getEndYear(); 
		for(int i = 0; i < numDays; i++){
			sDay++;
			eDay++;
			if(sDay > monthArray[sMonth - 1]){
				sDay = 1;
				sMonth++;
				if(sMonth > 12){
					sMonth = 1;
					sYear++;
				}
			}
			if(eDay > monthArray[eMonth - 1]){
				eDay = 1;
				eMonth++;
				if(eMonth > 12){
					eMonth = 1;
					eYear++;
				}
			}
		}
		
		setStartDay(sDay);
		setEndDay(eDay);
		setStartMonth(sMonth);
		setEndMonth(eMonth);		
		setStartYear(sYear);
		setEndYear(eYear);		
	}
	
}
