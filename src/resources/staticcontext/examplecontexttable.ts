import { TestStaticFeature } from "../../classes/feature/teststatic/TestStaticFeature";
import { DynamicContextObject } from "../../classes/contextevent/dynamiccontextobject";
import { StaticContextObject } from "../../classes/contextevent/staticcontextobject";
import { CallEventTable, ContextEventEntry } from "./contexteventtypes";
import { EventRunner } from "../../classes/contextevent/contexteventhandler";

export const ExampleCallTable : CallEventTable = {
    test_a: {
        event_priotity: 0,
        async genericEvent(this: EventRunner, eventSource : any, trackVal : any, context_func : ContextEventEntry, context_static : StaticContextObject, context_main : DynamicContextObject | null) 
        {
            console.log("Test_A")
        },
        async genericReturnEvent(this: EventRunner, eventSource : any, relayVar : any, trackVal : any, context_func : ContextEventEntry, context_static : StaticContextObject, context_main : DynamicContextObject | null) 
        {
            return relayVar - context_func['testinput'];
        }
    },
    test_b: {
        event_priotity: 2,
        async genericEvent(this: EventRunner, eventSource : any, trackVal : any, context_func : ContextEventEntry, context_static : StaticContextObject, context_main : DynamicContextObject | null) 
        {
            console.log("Test_B")
        },
        async genericReturnEvent(this: EventRunner, eventSource : any, relayVar : any, trackVal : any, context_func : ContextEventEntry, context_static : StaticContextObject, context_main : DynamicContextObject | null) 
        {
            if (context_static instanceof TestStaticFeature) {
                
                return relayVar * (context_static as TestStaticFeature).teststatic;
            } else {
            return relayVar * 2;
            }
        }
    },
    test_c: {
        event_priotity: 1,
        async genericReturnEvent(this: EventRunner, eventSource : any, relayVar : any, trackVal : any, context_func : ContextEventEntry, context_static : StaticContextObject, context_main : DynamicContextObject | null) 
        {
            return relayVar + 2;
        }
    },
    test_d: {
        event_priotity: 1,
        async genericEvent(this: EventRunner, eventSource : any, trackVal : any, context_func : ContextEventEntry, context_static : StaticContextObject, context_main : DynamicContextObject | null) 
        {
            console.log("Test_D")
            console.log(context_func['testinput'])
        }
    }
}