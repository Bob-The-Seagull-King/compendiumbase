import { DynamicContextObject } from "../../classes/contextevent/dynamiccontextobject";
import { StaticContextObject } from "../../classes/contextevent/staticcontextobject";

/**
 * Events that can be called by the runEvent method,
 * all options components of the interfaces that ineherit them.
 */
export interface CallEvents {
    event_priotity : number,
    genericEvent? : (eventSource : any, relayVar : any, trackVal : any, context_func : {}, context_static : StaticContextObject, context_main : DynamicContextObject | null) => Promise<void>; // Generic all-purpose event, avoid using if possible
}

export interface CallEventTable {[tokenid: string]: CallEvents}

export type ContextEventVals = {[type : string]: {}}; // Used for type chart matchups