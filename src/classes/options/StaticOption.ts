import { DescriptionFactory } from "../../utility/functions";
import { IRequest, Requester } from "../../factories/Requester";
import { ContextEventVals } from "../../resources/staticcontext/contexteventtypes";
import { OptionCallTable } from "../../resources/staticcontext/optioncontexttable";
import { StaticOptionContextObject } from "./StaticOptionContextObject";

interface IStaticOption {
    ref_id : string,
    name : string,
    description : []
    category : string
}

interface IChoice {
    id : number,
    value : any,
    display_str : string
}

/**
StaticOptions are built in StaticOptionContextObjects based
on provided data - different types of staticoptions exist and
gather their specific selections in unique ways.

Generation is decided in the StaticOption factory, and includes
the ability to ask questions in order to get selection options.
*/
class StaticOption {
    public RefID : string;
    public Name : string;
    public Category : string;

    public Description;
    public Selections : IChoice[] = [];

    public MyStaticObject;

    public constructor(data : IStaticOption, parent : StaticOptionContextObject) {
        this.RefID = data.ref_id;
        this.Name = data.name;
        this.Category = data.category;

        this.MyStaticObject = parent;
        this.Description = DescriptionFactory(data.description);
    }

    public FindChoices() {undefined}

    public ReturnChoices() {        
        return this.Selections
    }

    public GetSingleChoice(id : number) {
        return this.Selections[id];
    }

    public GetChoiceIDs() {
        const id_arr : number[] = []

        for (let i = 0; i < this.Selections.length; i++) {
            id_arr.push(this.Selections[i].id)
        }

        return id_arr;
    }

}

interface IStaticOptionTypeList extends IStaticOption {
    type : 'text' | 'number',
    strictness : 'loose' | 'free_form' | 'strict',
    predefined_options : string[]
    data_search? : IRequest,
    option_context : ContextEventVals
}

class StaticOptionTypeList extends StaticOption {

    public EntryType;
    public Strictness;
    public PresetOptions;
    public DataSearch : IRequest | null = null;
    public OptionContext;

    public constructor(data : IStaticOptionTypeList, parent :  StaticOptionContextObject) {
        super(data, parent)

        this.EntryType = data.type;
        this.Strictness = data.strictness;
        this.PresetOptions = data.predefined_options;
        this.OptionContext = data.option_context;

        if (data.data_search) {
            this.DataSearch = data.data_search;
        }
        
        this.FindChoices();
    }

    public FindChoices() {
        this.Selections = []

        let id_num = 0;
        for (let i = 0; i < this.PresetOptions.length; i++) {
            const val_key = Object.keys(this.OptionContext)[0]
            const value = OptionCallTable[val_key].genericReturn(this, this.OptionContext[val_key], this.PresetOptions[i])

            this.Selections.push({
                id: id_num,
                value: this.PresetOptions[i],
                display_str : value
            })
            id_num += 1;
        }

        if (this.DataSearch != null) {
            const results = Requester.MakeRequest(this.DataSearch);

            for (let i = 0; i < results.length; i++) {
                const val_key = Object.keys(this.OptionContext)[0]
                const value = OptionCallTable[val_key].genericResultReturn(this, this.OptionContext[val_key], results[i])

                this.Selections.push({
                    id: id_num,
                    value: results[i],
                    display_str : value
                })
                id_num += 1;
            }
        }
    }
    
}

interface IStaticOptionContextObjectList extends IStaticOption {
    parent_level : number,
    question : ContextEventVals
}

/**
 * Other context objects, such as other Blocks or Monsters
 * 
 * Gathered using context events
 * 
 * Given a parentage-value, which is how many steps up the context tree to start looking
 */
class StaticOptionContextObjectList extends StaticOption {
    public ParentRefLevel : number;
    public Question : ContextEventVals;

    public constructor(data : IStaticOptionContextObjectList, parent :  StaticOptionContextObject) {
        super(data, parent)

        this.ParentRefLevel = data.parent_level;
        this.Question = data.question;
        
        this.FindChoices();
    }

    public FindChoices() {
        console.log("ContextObject FindChoices")
    }
    
}

export {IStaticOption, StaticOption, IStaticOptionTypeList, StaticOptionTypeList, IStaticOptionContextObjectList, StaticOptionContextObjectList}