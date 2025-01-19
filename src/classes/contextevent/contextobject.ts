import { CallEventTable, ContextEventVals } from "../../resources/staticcontext/contexteventtypes";
import { CompendiumItem, ICompendiumItemData } from "../CompendiumItem";
import { ContextPackage } from "./contextpackage";
import { DynamicContextObject } from "./dynamiccontextobject";

interface IContextObject extends ICompendiumItemData {
    contextdata : ContextEventVals;
}

class ContextObject extends CompendiumItem {

    public ContextKeys : ContextEventVals = {}
    public ContextData : CallEventTable | undefined;

    public MyContext : DynamicContextObject | null = null;

    public async GrabContextPackages(event_id : string, source_obj : ContextObject, arrs_extra : any[]) : Promise<ContextPackage[]> { return []; }

}

export {ContextObject, IContextObject}