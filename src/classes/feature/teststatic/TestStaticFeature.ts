import { ExampleCallTable } from "../../../resources/staticcontext/examplecontexttable";
import { StaticContextObject, IStaticContextObject } from "../../contextevent/staticcontextobject";

interface ITestStaticFeature extends IStaticContextObject {
    teststatic : number
}

class TestStaticFeature extends StaticContextObject {

    public readonly teststatic;

    constructor(data : ITestStaticFeature) {
        super(data);
        this.teststatic = data.teststatic;
        this.ContextKeys = data.contextdata;
        this.ContextData = ExampleCallTable;
    }

}

export {TestStaticFeature, ITestStaticFeature}