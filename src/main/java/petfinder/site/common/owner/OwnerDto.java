package petfinder.site.common.owner;

import java.util.List;

import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class OwnerDto {
	private UserDto user;
	private List<PetDto> pets;
	private String crenumber;
	private String ccvnumber;
	private int expdatemonth;
	private int expdateyear;
	private String cardname;

	public OwnerDto(UserDto user, List<PetDto> pets, String cN, String cvN,
			int month, int year, String name) {
		this.user = user;
		this.pets = pets;
		crenumber = cN;
		ccvnumber= cvN;
		expdatemonth = month;
		expdateyear = year;
		cardname = name;
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



	public UserDto getUser() {
		return user;
	}

	public void setUser(UserDto user) {
		this.user = user;
	}

	public List<PetDto> getPets() {
		return pets;
	}

	public void setPets(List<PetDto> pets) {
		this.pets = pets;
	}
}