package petfinder.site.common.owner;

import java.util.List;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class OwnerDto {
	private int userId;
	private List<Integer> petIds;
	private String crenumber;
	private String ccvnumber;
	private int expdatemonth;
	private int expdateyear;
	private String cardname;

	public OwnerDto() {
		
	}
	
	public OwnerDto(int user, List<Integer> pets, String cN, String cvN,
			int month, int year, String name) {
		this.userId = user;
		this.petIds = pets;
		crenumber = cN;
		ccvnumber= cvN;
		expdatemonth = month;
		expdateyear = year;
		cardname = name;
	}
	
	public String toString() {
		List<Integer> list = getPetIds();
		String value = "user: " + getUserId();
		for(Integer i : list){
			value += " pet: " + i;
		}
		value += " creN: " + getCrenumber() + " ccvN: " + getCcvnumber() + " EXPM: " + getExpdatemonth() + 
				" EXPY: " + getExpdateyear() + " cardName: " + getCardname();
		
		return value;
	}
	
	public boolean equals(OwnerDto o){
		if(userId == o.getUserId() && petIds.equals(o.getPetIds()) && crenumber.equals(o.getCrenumber()) &&
				ccvnumber.equals(o.getCcvnumber()) &&  expdatemonth == o.getExpdatemonth() &&
				expdateyear == o.getExpdateyear() && cardname.equals(o.getCardname())){
			return true;
		}
		return false;
	}
	
	

	/**
	 * @return the crenumber
	 */
	public String getCrenumber() {
		return crenumber;
	}



	/**
	 * @param crenumber the crenumber to set
	 */
	public void setCrenumber(String crenumber) {
		this.crenumber = crenumber;
	}



	/**
	 * @return the ccvnumber
	 */
	public String getCcvnumber() {
		return ccvnumber;
	}



	/**
	 * @param ccvnumber the ccvnumber to set
	 */
	public void setCcvnumber(String ccvnumber) {
		this.ccvnumber = ccvnumber;
	}



	/**
	 * @return the expdatemonth
	 */
	public int getExpdatemonth() {
		return expdatemonth;
	}



	/**
	 * @param expdatemonth the expdatemonth to set
	 */
	public void setExpdatemonth(int expdatemonth) {
		this.expdatemonth = expdatemonth;
	}



	/**
	 * @return the expdateyear
	 */
	public int getExpdateyear() {
		return expdateyear;
	}



	/**
	 * @param expdateyear the expdateyear to set
	 */
	public void setExpdateyear(int expdateyear) {
		this.expdateyear = expdateyear;
	}



	/**
	 * @return the cardname
	 */
	public String getCardname() {
		return cardname;
	}



	/**
	 * @param cardname the cardname to set
	 */
	public void setCardname(String cardname) {
		this.cardname = cardname;
	}



	public int getUserId() {
		return userId;
	}

	public void setUserId(int user) {
		this.userId = user;
	}

	public List<Integer> getPetIds() {
		return petIds;
	}

	public void setPetIds(List<Integer> pets) {
		this.petIds = pets;
	}
}