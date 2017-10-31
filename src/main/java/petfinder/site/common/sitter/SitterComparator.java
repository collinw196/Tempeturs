package petfinder.site.common.sitter;

import java.util.Comparator;
import java.util.List;

public class SitterComparator implements Comparator<SitterDto> {
	
	private int sortType;
	private String zip;
	private List<String> types;

	@Override
	public int compare(SitterDto arg0, SitterDto arg1) {
		switch(sortType){
			case 0:
				if(arg0.calculateLocationScore(zip) < arg1.calculateLocationScore(zip)){
					return 1;
				} else if(arg0.calculateLocationScore(zip) > arg1.calculateLocationScore(zip)){
					return -1;
				} else {
					if(arg0.calculateRatingScore() < arg1.calculateRatingScore()){
						return 1;
					} else if(arg0.calculateRatingScore() > arg1.calculateRatingScore()){
						return -1;
					} else {
						if(arg0.calculatePreferenceScore(types) < arg1.calculatePreferenceScore(types)){
							return 1;
						} else if(arg0.calculatePreferenceScore(types) > arg1.calculatePreferenceScore(types)){
							return -1;
						} else {
							return 1;
						}
					}
				}
			case 1:
				if(arg0.calculateLocationScore(zip) < arg1.calculateLocationScore(zip)){
					return 1;
				} else if(arg0.calculateLocationScore(zip) > arg1.calculateLocationScore(zip)){
					return -1;
				} else {
					if(arg0.calculatePreferenceScore(types) < arg1.calculatePreferenceScore(types)){
						return 1;
					} else if(arg0.calculatePreferenceScore(types) > arg1.calculatePreferenceScore(types)){
						return -1;
					} else {
						if(arg0.calculateRatingScore() < arg1.calculateRatingScore()){
							return 1;
						} else if(arg0.calculateRatingScore() > arg1.calculateRatingScore()){
							return -1;
						} else {
							return 1;
						}
					}
				}
			case 2:
				if(arg0.calculateRatingScore() < arg1.calculateRatingScore()){
					return 1;
				} else if(arg0.calculateRatingScore() > arg1.calculateRatingScore()){
					return -1;
				} else {
					if(arg0.calculatePreferenceScore(types) < arg1.calculatePreferenceScore(types)){
						return 1;
					} else if(arg0.calculatePreferenceScore(types) > arg1.calculatePreferenceScore(types)){
						return -1;
					} else {
						if(arg0.calculateLocationScore(zip) < arg1.calculateLocationScore(zip)){
							return 1;
						} else if(arg0.calculateLocationScore(zip) > arg1.calculateLocationScore(zip)){
							return -1;
						}  else {
							return 1;
						}
					}
				}
			case 3:
				if(arg0.calculateRatingScore() < arg1.calculateRatingScore()){
					return 1;
				} else if(arg0.calculateRatingScore() > arg1.calculateRatingScore()){
					return -1;
				} else {
					if(arg0.calculateLocationScore(zip) < arg1.calculateLocationScore(zip)){
						return 1;
					} else if(arg0.calculateLocationScore(zip) > arg1.calculateLocationScore(zip)){
						return -1;
					} else {
						if(arg0.calculatePreferenceScore(types) < arg1.calculatePreferenceScore(types)){
							return 1;
						} else if(arg0.calculatePreferenceScore(types) > arg1.calculatePreferenceScore(types)){
							return -1;
						} else {
							return 1;
						}
					}
				}
			case 4:
				if(arg0.calculatePreferenceScore(types) < arg1.calculatePreferenceScore(types)){
					return 1;
				} else if(arg0.calculatePreferenceScore(types) > arg1.calculatePreferenceScore(types)){
					return -1;
				} else {
					if(arg0.calculateLocationScore(zip) < arg1.calculateLocationScore(zip)){
						return 1;
					} else if(arg0.calculateLocationScore(zip) > arg1.calculateLocationScore(zip)){
						return -1;
					} else {
						if(arg0.calculateRatingScore() < arg1.calculateRatingScore()){
							return 1;
						} else if(arg0.calculateRatingScore() > arg1.calculateRatingScore()){
							return -1;
						} else {
							return 1;
						}
					}
				}
			case 5:
				if(arg0.calculatePreferenceScore(types) < arg1.calculatePreferenceScore(types)){
					return 1;
				} else if(arg0.calculatePreferenceScore(types) > arg1.calculatePreferenceScore(types)){
					return -1;
				} else {
					if(arg0.calculateRatingScore() < arg1.calculateRatingScore()){
						return 1;
					} else if(arg0.calculateRatingScore() > arg1.calculateRatingScore()){
						return -1;
					} else {
						if(arg0.calculateLocationScore(zip) < arg1.calculateLocationScore(zip)){
							return 1;
						} else if(arg0.calculateLocationScore(zip) > arg1.calculateLocationScore(zip)){
							return -1;
						} else {
							return 1;
						}
					}
				}
			default:
				return -1;
		}
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
	 * @return the types
	 */
	public List<String> getTypes() {
		return types;
	}

	/**
	 * @param types the types to set
	 */
	public void setTypes(List<String> types) {
		this.types = types;
	}

	public int getSortType() {
		return sortType;
	}

	public void setSortType(int sortType) {
		this.sortType = sortType;
	}
}
