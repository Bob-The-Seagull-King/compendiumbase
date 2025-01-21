import { DynamicContextObject } from "../../contextevent/dynamiccontextobject";
import { ICompendiumItemData, CompendiumItem, ItemType } from '../../CompendiumItem'
import { TestStaticFeature } from "./TestStaticFeature";
import { TestStaticFeatureFactory } from "../../../factories/features/TestStaticFeatureFactory";
import { ContextObject, IContextObject } from "../../contextevent/contextobject";
import { ContextPackage } from "../../contextevent/contextpackage";
import { BaseContextCallTable } from "../../../resources/staticcontext/BaseContextTable";
import { DynamicOptionContextObject } from "../../options/DynamicOptionContextObject";

class TestStaticInContextFeature extends DynamicOptionContextObject {

}

export {TestStaticInContextFeature}