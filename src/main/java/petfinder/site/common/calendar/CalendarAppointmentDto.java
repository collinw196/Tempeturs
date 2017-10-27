package petfinder.site.common.calendar;

import java.util.List;

public class CalendarAppointmentDto extends CalendarBlockDto {
	private String ownerUsername;
	private List<Integer> petIds;
	private String acceptedStatus;
	private String appointmentStatus;
	private String notes;
	private String urgency;
	private String paymentAmount;
	
	public CalendarAppointmentDto(){
		
	}
	
	public CalendarAppointmentDto(Long blockId, int startDay, int startMonth, int startYear, int endDay, int endMonth,
			int endYear, int startMin, int startHour, int endMin, int endHour, String username, int repeatStrategy,
			String notficationMessage, String ownerUsername, List<Integer> petIds, String acceptedStatus,
			String appointmentStatus, String notes, String urgency, String paymentAmount) {
		super(blockId, startDay, startMonth, startYear, endDay, endMonth, endYear, startMin, startHour, endMin, endHour,
				username, repeatStrategy, notficationMessage);
		this.ownerUsername = ownerUsername;
		this.petIds = petIds;
		this.acceptedStatus = acceptedStatus;
		this.appointmentStatus = appointmentStatus;
		this.notes = notes;
		this.urgency = urgency;
		this.paymentAmount = paymentAmount;
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
	 * @return the acceptedStatus
	 */
	public String getAcceptedStatus() {
		return acceptedStatus;
	}
	/**
	 * @param acceptedStatus the acceptedStatus to set
	 */
	public void setAcceptedStatus(String acceptedStatus) {
		this.acceptedStatus = acceptedStatus;
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
	public String getPaymentAmount() {
		return paymentAmount;
	}
	/**
	 * @param paymentAmount the paymentAmount to set
	 */
	public void setPaymentAmount(String paymentAmount) {
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


}
