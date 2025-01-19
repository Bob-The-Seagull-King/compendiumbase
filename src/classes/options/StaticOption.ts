import { DescriptionFactory } from "../../utility/functions";
import { IRequest } from "../../factories/Requester";
import { ContextEventVals } from "../../resources/staticcontext/contexteventtypes";

interface IStaticOption {
    ref_id : string,
    name : string,
    description : []
    category : string
}

interface IChoice {
    id : number,
    value : any
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

    public constructor(data : IStaticOption) {
        this.RefID = data.ref_id;
        this.Name = data.name;
        this.Category = data.category;

        this.Description = DescriptionFactory(data.description);
    }

    public FindChoices() {undefined}

    public ReturnChoices() {undefined}

    public GetSingleChoice(id : number) {undefined}

    public GetChoiceIDs() {undefined}

}

interface IStaticOptionTypeList extends IStaticOption {
    type : 'text' | 'number',
    strictness : 'loose' | 'free_form' | 'strict',
    predefined_options : string[]
    data_search? : IRequest
}

/**
 * Simple data, such as names, numbers, and free-text
 * 
 * Can be gathered from pre-defined lists, or searches, or questions
 * 
 * Can be strict (only choose from choices) loose (given choices, can write-in) or free-form (only write in)
 * 
 * Can be text or number
 */
class StaticOptionTypeList extends StaticOption {

    public EntryType;
    public Strictness;
    public PresetOptions;
    public DataSearch : IRequest | null = null;

    public constructor(data : IStaticOptionTypeList) {
        super(data)

        this.EntryType = data.type;
        this.Strictness = data.strictness;
        this.PresetOptions = data.predefined_options;

        if (data.data_search) {
            this.DataSearch = data.data_search;
        }
        
        this.FindChoices();
    }

    public FindChoices() {
        console.log("TypeList FindChoices")
    }

    public ReturnChoices() {undefined}
    
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

    public constructor(data : IStaticOptionContextObjectList) {
        super(data)

        this.ParentRefLevel = data.parent_level;
        this.Question = data.question;
        
        this.FindChoices();
    }

    public FindChoices() {
        console.log("ContextObject FindChoices")
    }

    public ReturnChoices() {undefined}
    
}

export {IStaticOption, StaticOption, IStaticOptionTypeList, StaticOptionTypeList, IStaticOptionContextObjectList, StaticOptionContextObjectList}