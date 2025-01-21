import { StaticContextObject } from "../../contextevent/staticcontextobject";
import { DynamicContextObject } from "../../../classes/contextevent/dynamiccontextobject";
import { BaseContextCallTable } from "../../../resources/staticcontext/BaseContextTable";
import { StaticOptionContextObject, IStaticOptionContextObject } from "../../options/StaticOptionContextObject";
import { IContextObject } from "../../contextevent/contextobject";

interface ITestBasicFeature extends IContextObject {
    teststatic : number
}

class TestBasicFeature extends StaticContextObject {

    public readonly teststatic;

    constructor(data : ITestBasicFeature, parent : DynamicContextObject | null) {
        super(data, parent);
        this.teststatic = data.teststatic;
    }

}

export {TestBasicFeature, ITestBasicFeature}