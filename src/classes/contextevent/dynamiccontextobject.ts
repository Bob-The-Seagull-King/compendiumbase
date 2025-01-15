import { ContextObject } from "./contextobject";
import { ContextPackage } from "./contextpackage";


class DynamicContextObject extends ContextObject {

    
    public async GrabContextPackages(event_id : string, source_obj : ContextObject) { 
        const SubPackages : ContextPackage[] = await this.GrabSubPackages(event_id, source_obj);

        for (let i = 0; i < SubPackages.length; i++) {
            if (SubPackages[i].dyncontext == null) {
                SubPackages[i].dyncontext = this;
            }
        }

        return SubPackages;
    }

    
    private async GrabSubPackages(event_id : string, source_obj : ContextObject) : Promise<ContextPackage[]> { return []; }

}

export {DynamicContextObject}