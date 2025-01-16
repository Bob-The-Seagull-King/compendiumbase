import { ContextObject } from "./contextobject";
import { ContextPackage } from "./contextpackage";

class EventRunner {

    public async runEvent(
        event_id : string, 
        source_obj : ContextObject, 
        arrs_extra : any[], 
        relayVar : any, 
        trackVal : any) : Promise<any>
        {

        const Events : ContextPackage[] = await source_obj.GrabContextPackages(event_id, source_obj);
        Events.sort((a, b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0)

        // Initialize the return value
        let relay_variable = relayVar;
        let returnVal;

        // Run each event
        for (const _event of Events) {
            
            // Determine function arguments
            const args = [];

            let i = 0;
            if ((_event.source !== undefined) && (_event.source !== null)) { args[i] = _event.source; i += 1;}
            if ((relay_variable !== undefined) && (relay_variable !== null)) { args[i] = relay_variable; i += 1;}
            if ((trackVal !== undefined) && (trackVal !== null)) { args[i] = trackVal; i += 1;}
            if ((_event.callbackdict !== undefined) && (_event.callbackdict !== null)) { args[i] = _event.callbackdict; i += 1;}
            if ((_event.self !== undefined) && (_event.self !== null)) { args[i] = _event.self; i += 1;}
            if ((_event.dyncontext !== undefined)) { args[i] = _event.dyncontext; i += 1;}
            
            const final_args = args.concat(arrs_extra)
            
            // Run the event
            returnVal = await _event.callback.apply(this, final_args);
            relay_variable = returnVal;
        }

        return relay_variable;
    }
}

export {EventRunner}