package petfinder.site.common.sitter;

import java.util.List;

public class SitterDto {
	private String username;
	private String accountNumber;
	private String routingNumber;
	private String preference1;
	private String preference2;
	private String preference3;
	private double rating;
	private int numRating;
	private String zip;
	
	public SitterDto() {
		rating = 0.0;
	}
	
	public SitterDto(String user, String aN, String rN, String p1, String p2, String p3, double rat, int numRat, String zip){
		username = user;
		accountNumber = aN;
		routingNumber = rN;
		preference1 = p1;
		preference2 = p2;
		preference3 = p3;
		rating = rat;
		numRating = numRat;
		this.zip = zip;
	}

	public String toString() {
		return "username: " + getUsername() + " accountNumber: " + getAccountNumber() + " routingNumber: " + getRoutingNumber() +
				" preference1: " + getPreference1() + " preference2: " + getPreference2() + " preference3: " + getPreference3() + 
				" rating: " + getRating() + " numRating: " + getNumRating() + " zip: " + getZip();
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
		SitterDto other = (SitterDto) obj;
		if (accountNumber == null) {
			if (other.accountNumber != null)
				return false;
		} else if (!accountNumber.equals(other.accountNumber))
			return false;
		if (numRating != other.numRating)
			return false;
		if (preference1 == null) {
			if (other.preference1 != null)
				return false;
		} else if (!preference1.equals(other.preference1))
			return false;
		if (preference2 == null) {
			if (other.preference2 != null)
				return false;
		} else if (!preference2.equals(other.preference2))
			return false;
		if (preference3 == null) {
			if (other.preference3 != null)
				return false;
		} else if (!preference3.equals(other.preference3))
			return false;
		if (Double.doubleToLongBits(rating) != Double.doubleToLongBits(other.rating))
			return false;
		if (routingNumber == null) {
			if (other.routingNumber != null)
				return false;
		} else if (!routingNumber.equals(other.routingNumber))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		if (zip == null) {
			if (other.zip != null)
				return false;
		} else if (!zip.equals(other.zip))
			return false;
		return true;
	}

	public double calculatePreferenceScore(List<String> petTypes){
		double score = 0;
		for (String type : petTypes){
			if(type.equals(getPreference1())){
				score += 5;
			} else if (type.equals(getPreference2())){
				score += 3;
			} else if (type.equals(getPreference3())) {
				score += 1;
			}
		}
		
		return score / petTypes.size();
	}
	
	public double calculateLocationScore(String _zip){
		double score = 0;
		int thisZip = Integer.parseInt(zip);
		int otherZip = Integer.parseInt(_zip);
		if(thisZip == otherZip){
			score += 5;
		} else if((thisZip - otherZip) < 20 || (thisZip - otherZip) > -20){
			score += 4;
		} else if((thisZip - otherZip) < 50 || (thisZip - otherZip) > -50){
			score += 3;
		} else if((thisZip - otherZip) < 100 || (thisZip - otherZip) > -100){
			score += 2;
		} else if(zip.substring(0, 3).equals(_zip.substring(0, 3))){
			score += 1;
		}
		
		return score;
	}
	
	public double calculateRatingScore(){
		if(rating == 0){
			return 5.0;
		}
		return getRating();
	}
	
	/**
	 * @return the user
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param user the user to set
	 */
	public void setUsername(String user) {
		username = user;
	}
	/**
	 * @return the accountNumber
	 */
	public String getAccountNumber() {
		return accountNumber;
	}
	/**
	 * @param accountNumber the accountNumber to set
	 */
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	/**
	 * @return the rountingNumber
	 */
	public String getRoutingNumber() {
		return routingNumber;
	}
	/**
	 * @param rountingNumber the rountingNumber to set
	 */
	public void setRoutingNumber(String routingNumber) {
		this.routingNumber = routingNumber;
	}
	/**
	 * @return the preference1
	 */
	public String getPreference1() {
		return preference1;
	}
	/**
	 * @param preference1 the preference1 to set
	 */
	public void setPreference1(String preference1) {
		this.preference1 = preference1;
	}
	/**
	 * @return the preference2
	 */
	public String getPreference2() {
		return preference2;
	}
	/**
	 * @param preference2 the preference2 to set
	 */
	public void setPreference2(String preference2) {
		this.preference2 = preference2;
	}
	/**
	 * @return the preference3
	 */
	public String getPreference3() {
		return preference3;
	}
	/**
	 * @param preference3 the preference3 to set
	 */
	public void setPreference3(String preference3) {
		this.preference3 = preference3;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public int getNumRating() {
		return numRating;
	}

	public void setNumRating(int numRating) {
		this.numRating = numRating;
	}

}
