import { ICompendiumItemData } from "../CompendiumItem";
import { CallEventTable, ContextEventVals } from "../../resources/staticcontext/contexteventtypes";
import { ContextObject } from "./contextobject";
import { ContextPackage } from "./contextpackage";

interface IStaticContextObject extends ICompendiumItemData {
    contextdata : ContextEventVals;
}

class StaticContextObject extends ContextObject {

    public ContextKeys : ContextEventVals = {}
    public ContextData : CallEventTable | undefined;

    public async GrabContextPackages(event_id : string, source_obj : ContextObject) { 
        const StaticEvents : ContextPackage[] = [];

        if (this.ContextData) {            
            for (const key of Object.keys(this.ContextKeys)) {
                const context_entry = this.ContextData[key]
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore - dynamic lookup
                const func = context_entry[event_id];
                if (func !== undefined) {
                    const curr_package : ContextPackage = {
                        priority    : context_entry.event_priotity,
                        source      : source_obj,
                        self        : this,
                        callback    : func,
                        callbackdict: this.ContextKeys[key],
                        dyncontext  : this.MyContext
                    }

                    StaticEvents.push(curr_package);
                }                
             }
        }
 
        return StaticEvents; 
    }
    

}

export {StaticContextObject, IStaticContextObject}