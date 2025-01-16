import { Requester } from '../Requester';
import { ITestStaticFeature , TestStaticFeature } from '../../classes/feature/teststatic/TestStaticFeature'

class TestStaticFeatureFactory {

    /**
     * Creates an ability based on provided data
     * @param _ability The data in I format describing the object
     * @returns A newly created object
     */
    static CreateTestStaticFeature(_table: ITestStaticFeature) {
        const table = new TestStaticFeature(_table)
        return table;
    }

    static CreateNewTestStaticFeature(_val : string) {
        const tabledata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "teststaticfeature", id: _val}}) as ITestStaticFeature
        const tablenew = TestStaticFeatureFactory.CreateTestStaticFeature(tabledata)
        return tablenew;
    }

}

export {TestStaticFeatureFactory}