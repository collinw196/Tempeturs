package petfinder.site.common.sitter;

public class SitterSearchFilter {
	private String username;
	private String topPreference;
	private double ratingLimit;
	
	public SitterSearchFilter(){
		username = "";
		topPreference = "";
		ratingLimit = 0;
	}
	
	public SitterSearchFilter(String username, String topPreference, double ratingLimit) {
		super();
		this.username = username;
		this.topPreference = topPreference;
		this.ratingLimit = ratingLimit;
	}


	public boolean doesMatch(SitterDto sitter){
		boolean doesMatch = true;
		if (!username.equals("") && !username.equals(sitter.getUsername())){
			doesMatch = false;
		}
		if (!topPreference.equals("") && !topPreference.equals(sitter.getPreference1())){
			doesMatch = false;
		}
		if (ratingLimit < sitter.getRating()){
			doesMatch = false;
		}
		
		return doesMatch;
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
	 * @return the topPreference
	 */
	public String getTopPreference() {
		return topPreference;
	}


	/**
	 * @param topPreference the topPreference to set
	 */
	public void setTopPreference(String topPreference) {
		this.topPreference = topPreference;
	}


	/**
	 * @return the ratingLimit
	 */
	public double getRatingLimit() {
		return ratingLimit;
	}


	/**
	 * @param ratingLimit the ratingLimit to set
	 */
	public void setRatingLimit(double ratingLimit) {
		this.ratingLimit = ratingLimit;
	}
	
	
	
}
