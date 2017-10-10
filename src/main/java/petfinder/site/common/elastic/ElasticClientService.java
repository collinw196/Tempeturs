package petfinder.site.common.elastic;

import java.util.Collections;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.stereotype.Service;

@Service
public class ElasticClientService {
	RestClient restClient;
	
	public ElasticClientService() {
		final String ACCESS_KEY = "6w9ihs67x6";
		final String SECRET_KEY = "bjp06vix8x";
		final String URL = "banyan-3198160.us-east-1.bonsaisearch.net";

        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,
                new UsernamePasswordCredentials(ACCESS_KEY, SECRET_KEY));

        restClient = RestClient.builder(new HttpHost(URL, 443, "https"))
                .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
                    @Override
                    public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
                        return httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
                    }
                })
                .build();
	}
	
	public RestClient getClient() {
		return restClient;
	}

}
