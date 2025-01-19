import { ExampleCallTable } from "../../../resources/staticcontext/examplecontexttable";
import { StaticOptionContextObject, IStaticOptionContextObject } from "../../options/StaticOptionContextObject";

interface ITestStaticFeature extends IStaticOptionContextObject {
    teststatic : number
}

class TestStaticFeature extends StaticOptionContextObject {

    public readonly teststatic;

    constructor(data : ITestStaticFeature) {
        super(data);
        this.teststatic = data.teststatic;
        this.ContextKeys = data.contextdata;
        this.ContextData = ExampleCallTable;
    }

}

export {TestStaticFeature, ITestStaticFeature}