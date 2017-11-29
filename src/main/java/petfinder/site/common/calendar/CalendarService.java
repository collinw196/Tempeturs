package petfinder.site.common.calendar;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import petfinder.site.common.elastic.ElasticClientService;
import petfinder.site.common.sitter.SitterDto;


/**
 * Created by mattdulany.
 */
@Service
public class CalendarService {
	@Autowired
	private CalendarAppointmentDao appointmentDao;
	@Autowired
	private CalendarBlockDao blockDao;
	@Autowired
	private ElasticClientService clientService;
	
	public CalendarService(){
		
	}
	
	public CalendarService(ElasticClientService eS) {
		appointmentDao = new CalendarAppointmentDao();
		blockDao = new CalendarBlockDao();
		clientService = eS;
	}
	
	public CalendarService(CalendarAppointmentDao cAD, CalendarBlockDao cBD) {
		appointmentDao = cAD;
		blockDao = cBD;
	}

	public CalendarBlockDto getAppointment() {
		return appointmentDao.getAppointment();
	}
	
	public CalendarBlockDto getBlock() {
		return blockDao.getBlock();
	}
	
	public void addAppointment(CalendarAppointmentDto appointment){
		appointmentDao.setAppointment(appointment);
	}
	
	public void addBlock(CalendarBlockDto block){
		blockDao.setBlock(block);
	}
	
	public boolean isFree(SitterDto sitter, CalendarBlockDto appointment) throws JsonParseException, JsonMappingException, IOException {
		SearchRequest searchRequest = new SearchRequest("calendarappointments"); 
		searchRequest.types("external");
		BoolQueryBuilder boolQuery = new BoolQueryBuilder();
		boolQuery.must(QueryBuilders.matchQuery("username", sitter.getUsername()));
		RangeQueryBuilder rangeQuery = buildRangeQuery("year", appointment.getStartYear(), appointment.getEndYear());
		boolQuery.must(rangeQuery);
		rangeQuery = buildRangeQuery("month", appointment.getStartMonth(), appointment.getEndMonth());
		boolQuery.must(rangeQuery);
		rangeQuery = buildRangeQuery("day", appointment.getStartDay(), appointment.getEndDay());
		boolQuery.must(rangeQuery);
		rangeQuery = buildRangeQuery("hour", appointment.getStartHour(), appointment.getEndHour());
		boolQuery.must(rangeQuery);
		rangeQuery = buildRangeQuery("min", appointment.getStartMin(), appointment.getEndMin());
		boolQuery.must(rangeQuery);
		SearchSourceBuilder sourceBuilder = new SearchSourceBuilder(); 
		sourceBuilder.query(boolQuery); 
		sourceBuilder.from(0); 
		sourceBuilder.timeout(new TimeValue(120, TimeUnit.SECONDS));
		searchRequest.source(sourceBuilder);
		SearchResponse response = null;
		try {
			response = clientService.getHighClient().search(searchRequest);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int hitNum = 0;
		
		SearchHits hits = response.getHits();
		SearchHit[] searchHits = hits.getHits();
		ObjectMapper objectMapper = new ObjectMapper();
		for (SearchHit hit : searchHits){
			CalendarAppointmentDto appointment1 = objectMapper.readValue(hit.getSourceAsString(), CalendarAppointmentDto.class);
			if(appointment.getType().equals("Block") || appointment1.getAppointmentStatus().equals("ACCEPTED")){
				hitNum++;
			}
		}
		
		if(hitNum == 0){
			return true;
		}
		
		return false;
	}

	private RangeQueryBuilder buildRangeQuery(String field, int startYear, int endYear) {
		RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery(field);
        rangeQuery.from(startYear);
        rangeQuery.to(endYear);
		return rangeQuery;
	}

	public boolean isOpen(CalendarAppointmentDto appointment) {
		boolean isOpen = false;
		String value = appointment.getAppointmentStatus();
		if(value.equals("SCHEDULED") || value.equals("ACCEPTED") || value.equals("FINISHED")){
			isOpen = true;
		}
		return isOpen;
	}
}
