import { IContextObject } from "../contextevent/contextobject";
import { StaticOptionFactory } from "../../factories/features/StaticOptionFactory";
import { StaticContextObject } from "../contextevent/staticcontextobject";
import { IStaticOption, StaticOption } from "./StaticOption";

interface IStaticOptionContextObject extends IContextObject {
    options : IStaticOption[]
}

/*
StaticOptionContextObjects are static objects which contain some
number of options to select from, generated upon construction.

Some Options include questions to generate selection options, which
use this object to grab the relevant context source for event handling.
*/
class StaticOptionContextObject extends StaticContextObject {
    public MyOptions : StaticOption[];

    public constructor(data : IStaticOptionContextObject) {
        super(data)

        this.MyOptions = this.BuildOptions(data.options)
    }

    public BuildOptions(data : IStaticOption[]) {
        const OptionSet : StaticOption[] = []

        for (let i = 0; i < data.length; i++) {
            const newOption : StaticOption = StaticOptionFactory.CreateStaticOption(data[i])
            OptionSet.push(newOption);
        }

        return OptionSet;
    }


}

export {IStaticOptionContextObject, StaticOptionContextObject}