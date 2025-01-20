import { DynamicContextObject } from "../../contextevent/dynamiccontextobject";
import { ICompendiumItemData, CompendiumItem, ItemType } from '../../CompendiumItem'
import { TestStaticFeature } from "./TestStaticFeature";
import { TestStaticFeatureFactory } from "../../../factories/features/TestStaticFeatureFactory";
import { ContextObject, IContextObject } from "../../contextevent/contextobject";
import { ContextPackage } from "../../contextevent/contextpackage";
import { BaseContextCallTable } from "../../../resources/staticcontext/BaseContextTable";

interface ITestDynamicFeature extends IContextObject {
    teststaticlist : string[]
}

class TestDynamicFeature extends DynamicContextObject {

    public teststaticlist : TestStaticFeature[];

    constructor(data : ITestDynamicFeature, parent : DynamicContextObject | null) {
        super(data, parent);
        this.teststaticlist = this.BuildTestStaticList(data.teststaticlist)
        for (let i = 0; i < this.teststaticlist.length; i++) {
            for (let j = 0; j < this.teststaticlist[i].MyOptions.length; j++) {
                this.teststaticlist[i].MyOptions[j].FindChoices();
            } 
        } 
    }

    private BuildTestStaticList(data : string[]) {
        const staticlist : TestStaticFeature[] = [];

        for (let i =0; i < data.length; i++) {
            try {
                const new_static : TestStaticFeature = TestStaticFeatureFactory.CreateNewTestStaticFeature(data[i], this);
                staticlist.push(new_static);
            } catch(e) {
                console.log("Failed to generate TestStaticList with ID " + data[i])
            }
        }

        return staticlist;
    }

    public async GrabSubPackages(event_id : string, source_obj : ContextObject, arrs_extra : any[]) : Promise<ContextPackage[]> { 
        const subpackages : ContextPackage[] = []
        
        for (let i = 0; i < this.teststaticlist.length; i++) {
            const static_packages : ContextPackage[] = await this.teststaticlist[i].GrabContextPackages(event_id, source_obj, arrs_extra);
            for (let j = 0; j < static_packages.length; j++) {
                subpackages.push(static_packages[j])
            }
        }

        return subpackages; 
    }

}

export {TestDynamicFeature, ITestDynamicFeature}