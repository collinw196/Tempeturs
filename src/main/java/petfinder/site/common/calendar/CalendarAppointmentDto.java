package petfinder.site.common.calendar;

import java.util.List;

public class CalendarAppointmentDto extends CalendarBlockDto {
	private String ownerUsername;
	private List<Integer> petIds;
	private String appointmentStatus;
	private String notes;
	private String urgency;
	private double paymentAmount;
	
	public CalendarAppointmentDto(){
		
	}
	
	public CalendarAppointmentDto(int startDay, int startMonth, int startYear, int endDay, int endMonth,
			int endYear, int startMin, int startHour, int endMin, int endHour, String username, int repeatStrategy,
			String notficationMessage, String type, String ownerUsername, List<Integer> petIds,
			String appointmentStatus, String notes, String urgency, double paymentAmount) {
		super(startDay, startMonth, startYear, endDay, endMonth, endYear, startMin, startHour, endMin, endHour,
				username, repeatStrategy, notficationMessage, type);
		this.ownerUsername = ownerUsername;
		this.petIds = petIds;
		this.appointmentStatus = appointmentStatus;
		this.notes = notes;
		this.urgency = urgency;
		this.paymentAmount = paymentAmount;
	}

	public CalendarAppointmentDto(int startDay, int startMonth, int startYear, int endDay, int endMonth,
			int endYear, int startMin, int startHour, int endMin, int endHour, String username, int repeatStrategy,
			String notficationMessage, String type) {
		super(startDay, startMonth, startYear, endDay, endMonth, endYear, startMin, startHour, endMin, endHour,
				username, repeatStrategy, notficationMessage, type);
	}

	public CalendarAppointmentDto(CalendarAppointmentDto a) {
		super(a.getStartDay(), a.getStartMonth(), a.getStartYear(), a.getEndDay(), a.getEndMonth(), a.getEndYear(),
				a.getStartMin(), a.getStartHour(), a.getEndMin(), a.getEndHour(), a.getUsername(), a.getRepeatStrategy(),
				a.getNotificationMessage(), a.getType());
		setBlockId(a.getBlockId());
		this.ownerUsername = a.getOwnerUsername();
		this.petIds = a.getPetIds();
		this.appointmentStatus = a.getAppointmentStatus();
		this.notes = a.getNotes();
		this.urgency = a.getUrgency();
		this.paymentAmount = a.getPaymentAmount();
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		CalendarAppointmentDto other = (CalendarAppointmentDto) obj;
		if (appointmentStatus == null) {
			if (other.appointmentStatus != null)
				return false;
		} else if (!appointmentStatus.equals(other.appointmentStatus))
			return false;
		if (notes == null) {
			if (other.notes != null)
				return false;
		} else if (!notes.equals(other.notes))
			return false;
		if (ownerUsername == null) {
			if (other.ownerUsername != null)
				return false;
		} else if (!ownerUsername.equals(other.ownerUsername))
			return false;
		if (Double.doubleToLongBits(paymentAmount) != Double.doubleToLongBits(other.paymentAmount))
			return false;
		if (petIds == null) {
			if (other.petIds != null)
				return false;
		} else if (!petIds.equals(other.petIds))
			return false;
		if (urgency == null) {
			if (other.urgency != null)
				return false;
		} else if (!urgency.equals(other.urgency))
			return false;
		return true;
	}
	
	

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return super.toString() + "CalendarAppointmentDto [ownerUsername=" + ownerUsername + ", petIds=" + petIds + ", appointmentStatus="
				+ appointmentStatus + ", notes=" + notes + ", urgency=" + urgency + ", paymentAmount=" + paymentAmount
				+ "]";
	}

	/**
	 * @return the ownerUsername
	 */
	public String getOwnerUsername() {
		return ownerUsername;
	}
	/**
	 * @param ownerUsername the ownerUsername to set
	 */
	public void setOwnerUsername(String ownerUsername) {
		this.ownerUsername = ownerUsername;
	}
	/**
	 * @return the petIds
	 */
	public List<Integer> getPetIds() {
		return petIds;
	}
	/**
	 * @param petIds the petIds to set
	 */
	public void setPetIds(List<Integer> petIds) {
		this.petIds = petIds;
	}
	/**
	 * @return the appointmentStatus
	 */
	public String getAppointmentStatus() {
		return appointmentStatus;
	}
	/**
	 * @param appointmentStatus the appointmentStatus to set
	 */
	public void setAppointmentStatus(String appointmentStatus) {
		this.appointmentStatus = appointmentStatus;
	}
	/**
	 * @return the notes
	 */
	public String getNotes() {
		return notes;
	}
	/**
	 * @param notes the notes to set
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}
	/**
	 * @return the paymentAmount
	 */
	public double getPaymentAmount() {
		return paymentAmount;
	}
	/**
	 * @param paymentAmount the paymentAmount to set
	 */
	public void setPaymentAmount(double paymentAmount) {
		this.paymentAmount = paymentAmount;
	}

	/**
	 * @return the urgency
	 */
	public String getUrgency() {
		return urgency;
	}


	/**
	 * @param urgency the urgency to set
	 */
	public void setUrgency(String urgency) {
		this.urgency = urgency;
	}

	public boolean isNotColide(CalendarAppointmentDto a) {
		boolean isCollide = false;
		if(getStartYear() == a.getStartYear() && getStartMonth() == a.getStartMonth() && getStartDay() == a.getStartDay()){
			if(getStartHour() >= a.getStartHour() && getStartMin() >= a.getStartMin() && getStartHour() <= a.getEndHour() && getStartMin() <= a.getEndMin()){
				isCollide = true;
			}
		}
		if(getEndYear() == a.getEndYear() && getEndMonth() == a.getEndMonth() && getEndDay() == a.getEndDay()){
			if(getEndHour() >= a.getStartHour() && getEndMin() >= a.getStartMin() && getEndHour() <= a.getEndHour() && getEndMin() <= a.getEndMin()){
				isCollide = true;
			}
		}
		return isCollide;
	}


}
