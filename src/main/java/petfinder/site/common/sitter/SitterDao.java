package petfinder.site.common.sitter;

import org.springframework.stereotype.Repository;

@Repository
public class SitterDao {
	private SitterDto sitter;
	
	public SitterDto findSitter(Long id) {
		return sitter;
		//return Optional.ofNullable(user.get(id));
	}
	
	public void setSitter(SitterDto sitter){
		this.sitter = sitter;
	}

}
