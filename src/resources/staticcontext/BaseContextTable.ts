import { TestStaticFeature } from "../../classes/feature/teststatic/TestStaticFeature";
import { DynamicContextObject } from "../../classes/contextevent/dynamiccontextobject";
import { StaticContextObject } from "../../classes/contextevent/staticcontextobject";
import { CallEventTable, ContextEventEntry } from "./contexteventtypes";
import { EventRunner } from "../../classes/contextevent/contexteventhandler";
import { ContextObject } from "../../classes/contextevent/contextobject";
import { StaticOptionContextObjectQuestion } from "../../classes/options/StaticOption";

export const BaseContextCallTable : CallEventTable = {
    option_search_viable: {
        event_priotity: 0,
        async optionSearchEvent(this: EventRunner, eventSource : any, relayVar : ContextObject[], trackVal : StaticOptionContextObjectQuestion, context_func : ContextEventEntry, context_static : StaticContextObject, context_main : DynamicContextObject | null, ) {
            console.log("DSADGKASJHDJKSAH")
            return relayVar;
        }
    }
}