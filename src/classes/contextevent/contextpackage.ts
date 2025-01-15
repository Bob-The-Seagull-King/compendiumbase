import { ContextEventVals } from "../../resources/staticcontext/contexteventtypes";
import { DynamicContextObject } from "./dynamiccontextobject";
import { StaticContextObject } from "./staticcontextobject";


interface ContextPackage {
	priority    : number;   // The priority for the event, determining which order events take place in.
    source      : any; // The source of the event
    self        : StaticContextObject;      // The origin object of the event function
    callback    : any;      // The function that will be called as a part of this event.
    callbackdict: ContextEventVals;     // Any additional information that comes with the
    dyncontext  : DynamicContextObject | null;     // The event function origin's parent context (or null)
}

export {ContextPackage}