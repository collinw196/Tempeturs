package petfinder.site.common.pet;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto {
	private Long id;
	private String name;
	private String type;
	private int age;
	private String notes;
	
	public PetDto(Long id, String name, String type, int age, String notes) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.age = age;
		this.notes = notes;
	}

	/**
	 * @return the age
	 */
	public int getAge() {
		return age;
	}

	/**
	 * @param age the age to set
	 */
	public void setAge(int age) {
		this.age = age;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}