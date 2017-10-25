package petfinder.site.common.sitter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import petfinder.site.common.elastic.ElasticClientService;

/**
 * Created by mattdulany.
 */
@Service
public class SitterService {
	@Autowired
	private SitterDao sitterDao;
	
	public SitterService() {
		sitterDao = new SitterDao();
	}
	
	public SitterService(SitterDao sD) {
		sitterDao = sD;
	}

	public SitterDto getSitter() {
		return sitterDao.getSitter();
	}
	
	public void addSitter(SitterDto sitter){
		sitterDao.setSitter(sitter);
	}
}
	
