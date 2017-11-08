package petfinder.site.test.unit;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({ TestSitterEndpoint.class, TestUserEndpoint.class, TestPetEndpoint.class, 
	TestOwnerEndpoint.class, TestCustomUserDetailService.class})
public class AllTests {

}
