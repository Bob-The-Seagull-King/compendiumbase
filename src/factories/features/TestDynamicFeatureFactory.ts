import { Requester } from '../Requester';
import { ITestDynamicFeature , TestDynamicFeature } from '../../classes/feature/teststatic/TestDynamicFeature'

class TestDynamicFeatureFactory {

    /**
     * Creates an ability based on provided data
     * @param _ability The data in I format describing the object
     * @returns A newly created object
     */
    static CreateTestDynamicFeature(_table: ITestDynamicFeature) {
        const table = new TestDynamicFeature(_table)
        return table;
    }

    static CreateNewTestDynamicFeature(_val : string) {
        const tabledata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "testdynamicfeature", id: _val}}) as ITestDynamicFeature
        const tablenew = TestDynamicFeatureFactory.CreateTestDynamicFeature(tabledata)
        return tablenew;
    }

}

export {TestDynamicFeatureFactory}