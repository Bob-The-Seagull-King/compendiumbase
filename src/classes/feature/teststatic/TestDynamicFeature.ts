import { DynamicContextObject } from "../../contextevent/dynamiccontextobject";
import { ICompendiumItemData, CompendiumItem, ItemType } from '../../CompendiumItem'
import { TestStaticFeature } from "./TestStaticFeature";
import { TestStaticFeatureFactory } from "../../../factories/features/TestStaticFeatureFactory";
import { ContextObject } from "../../contextevent/contextobject";
import { ContextPackage } from "../../contextevent/contextpackage";

interface ITestDynamicFeature extends ICompendiumItemData {
    teststaticlist : string[]
}

class TestDynamicFeature extends DynamicContextObject {

    public teststaticlist : TestStaticFeature[];

    constructor(data : ITestDynamicFeature) {
        super(data);

        this.teststaticlist = this.BuildTestStaticList(data.teststaticlist)
    }

    private BuildTestStaticList(data : string[]) {
        const staticlist : TestStaticFeature[] = [];

        for (let i =0; i < data.length; i++) {
            try {
                const new_static : TestStaticFeature = TestStaticFeatureFactory.CreateNewTestStaticFeature(data[i]);
                staticlist.push(new_static);
            } catch(e) {
                console.log("Failed to generate TestStaticList with ID " + data[i])
            }
        }

        return staticlist;
    }

    public async GrabSubPackages(event_id : string, source_obj : ContextObject) : Promise<ContextPackage[]> { 
        const subpackages : ContextPackage[] = []
        
        for (let i = 0; i < this.teststaticlist.length; i++) {
            const static_packages : ContextPackage[] = await this.teststaticlist[i].GrabContextPackages(event_id, source_obj);
            for (let j = 0; j < static_packages.length; j++) {
                subpackages.push(static_packages[j])
            }
        }

        return subpackages; 
    }

}

export {TestDynamicFeature, ITestDynamicFeature}