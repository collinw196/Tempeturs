package petfinder.site.common.sitter;

import petfinder.site.common.user.UserDto;

public class SitterDto {
	private UserDto user;
	private String accountNumber;
	private String routingNumber;
	private String preference1;
	private String preference2;
	private String preference3;

	public SitterDto(UserDto user, String aN, String rN, String p1, String p2, String p3){
		this.user = user;
		accountNumber = aN;
		routingNumber = rN;
		preference1 = p1;
		preference2 = p2;
		preference3 = p3;
	}


	/**
	 * @return the user
	 */
	public UserDto getUser() {
		return user;
	}
	/**
	 * @param user the user to set
	 */
	public void setUser(UserDto user) {
		this.user = user;
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
	public String getRountingNumber() {
		return routingNumber;
	}
	/**
	 * @param rountingNumber the rountingNumber to set
	 */
	public void setRountingNumber(String routingNumber) {
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


}
