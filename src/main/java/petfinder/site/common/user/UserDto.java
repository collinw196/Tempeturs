package petfinder.site.common.user;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;


/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto {
	private String firstName;
	private String lastName;
	private String email;
	private String username;
	private String password;
	private String street1;
	private String street2;
	private String po;
	private String zip;
	private String state;
	private String phone;
	private String gender;
	private String type;
	private String role;
	private List<Integer> notificationIds;
	
	public UserDto() {
		
	}

	
	public UserDto(String firstName, String lastName, String email, String username, String password, String street1,
			String street2, String po, String zip, String state, String phone, String gender, String type, String role, List<Integer> notificationIds) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
		this.street1 = street1;
		this.street2 = street2;
		this.po = po;
		this.zip = zip;
		this.state = state;
		this.phone = phone;
		this.gender = gender;
		this.type = type;
		this.role = role;
		this.notificationIds = notificationIds;
	}


	public String toString() {
		return "fN: " + getFirstName() + " lN: " + getLastName() + " email: " + getEmail() +
				" username: " + getUsername() + " password: " + getPassword() + " s1: " + getStreet1() + " s2: " + getStreet2() +
				" po: " + getPo() + " zip: " + getZip() + " state: " + getState() + " p: " + getPhone() + " g: " + getGender() +
				" t: " + getType() + " nIds: " + getNotificationIds().toString();
	}
	
	public boolean equals(UserDto value){
		if (!(password.equals(value.getPassword()))) {
		    return false;
		}
		if(firstName.equals(value.getFirstName()) && lastName.equals(value.getLastName()) &&
				email.equals(value.getEmail()) && username.equals(value.getUsername()) &&
				street1.equals(value.getStreet1()) && street2.equals(value.getStreet2()) && po.equals(value.getPo()) &&
				zip.equals(value.getZip()) && state.equals(value.getState()) && phone.equals(value.getPhone()) &&
				gender.equals(value.getGender()) && type.equals(value.getType()) && notificationIds.equals(value.getNotificationIds())) {
			return true;
		}
		return false;
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
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the street1
	 */
	public String getStreet1() {
		return street1;
	}

	/**
	 * @param street1 the street1 to set
	 */
	public void setStreet1(String street1) {
		this.street1 = street1;
	}

	/**
	 * @return the street2
	 */
	public String getStreet2() {
		return street2;
	}

	/**
	 * @param street2 the street2 to set
	 */
	public void setStreet2(String street2) {
		this.street2 = street2;
	}

	/**
	 * @return the po
	 */
	public String getPo() {
		return po;
	}

	/**
	 * @param po the po to set
	 */
	public void setPo(String po) {
		this.po = po;
	}

	/**
	 * @return the zip
	 */
	public String getZip() {
		return zip;
	}

	/**
	 * @param zip the zip to set
	 */
	public void setZip(String zip) {
		this.zip = zip;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}

	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String name) {
		this.firstName = name;
	}
	
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String name) {
		this.lastName = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Integer> getNotificationIds() {
		return notificationIds;
	}

	public void setNotificationIds(List<Integer> notificationIds) {
		this.notificationIds = notificationIds;
	}


	public void removeNotId() {
		notificationIds.clear();		
	}
}