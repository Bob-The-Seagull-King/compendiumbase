import { TestStaticFeature } from "../../classes/feature/teststatic/TestStaticFeature";
import { DynamicContextObject } from "../../classes/contextevent/dynamiccontextobject";
import { StaticContextObject } from "../../classes/contextevent/staticcontextobject";
import { OptionEventTable, ContextEventEntry } from "./contexteventtypes";
import { EventRunner } from "../../classes/contextevent/contexteventhandler";
import { StaticOption } from "../../classes/options/StaticOption";
import { StaticOptionContextObject } from "../../classes/options/StaticOptionContextObject";

export const OptionCallTable : OptionEventTable = {
    basic_option_default : {        
        genericReturn(self_item: StaticOption, context_func : ContextEventEntry, input : string) {
            return input;
        },
        genericResultReturn(self_item: StaticOption, context_func : ContextEventEntry, input : any) {
            if (input.name) {
                return input.name;
            } else if (input.id) {
                return input.id;
            } else {return ""}
        }
    }
}