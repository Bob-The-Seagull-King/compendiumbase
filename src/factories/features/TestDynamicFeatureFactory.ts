import { Requester } from '../Requester';
import { ITestDynamicFeature , TestDynamicFeature } from '../../classes/feature/teststatic/TestDynamicFeature'
import { DynamicContextObject } from '../../classes/contextevent/dynamiccontextobject';

class TestDynamicFeatureFactory {

    /**
     * Creates an ability based on provided data
     * @param _ability The data in I format describing the object
     * @returns A newly created object
     */
    static CreateTestDynamicFeature(_table: ITestDynamicFeature, parent : DynamicContextObject | null) {
        const table = new TestDynamicFeature(_table, parent)
        return table;
    }

    static CreateNewTestDynamicFeature(_val : string, parent : DynamicContextObject | null) {
        const tabledata = Requester.MakeRequest({searchtype: "id", searchparam: {type: "testdynamicfeature", id: _val}}) as ITestDynamicFeature
        const tablenew = TestDynamicFeatureFactory.CreateTestDynamicFeature(tabledata, parent)
        return tablenew;
    }

}

export {TestDynamicFeatureFactory}