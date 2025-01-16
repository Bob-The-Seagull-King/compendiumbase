import { ContextObject } from "./contextobject";
import { ContextPackage } from "./contextpackage";


class DynamicContextObject extends ContextObject {

    
    public async GrabContextPackages(event_id : string, source_obj : ContextObject, arrs_extra : any[]) { 
        const SubPackages : ContextPackage[] = await this.GrabSubPackages(event_id, source_obj, arrs_extra);

        for (let i = 0; i < SubPackages.length; i++) {
            if (SubPackages[i].dyncontext == null) {
                SubPackages[i].dyncontext = this;
            }
        }

        return SubPackages;
    }

    
    public async GrabSubPackages(event_id : string, source_obj : ContextObject, arrs_extra : any[]) : Promise<ContextPackage[]> { return []; }

}

export {DynamicContextObject}