import { CompendiumItem } from "../CompendiumItem";
import { ContextPackage } from "./contextpackage";
import { DynamicContextObject } from "./dynamiccontextobject";


class ContextObject extends CompendiumItem {

    public MyContext : DynamicContextObject | null = null;

    public async GrabContextPackages(event_id : string, source_obj : ContextObject) : Promise<ContextPackage[]> { return []; }

}

export {ContextObject}