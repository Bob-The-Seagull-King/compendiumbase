import { DescriptionFactory } from "../../utility/functions";
import { IRequest, Requester } from "../../factories/Requester";
import { ContextEventVals } from "../../resources/staticcontext/contexteventtypes";
import { OptionCallTable } from "../../resources/staticcontext/optioncontexttable";
import { StaticOptionContextObject } from "./StaticOptionContextObject";
import { ContextObject } from "../../classes/contextevent/contextobject";
import { useState } from "react";
import { useGlobalState } from "../../utility/globalstate";

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

    public MyStaticObject : ContextObject | null;

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
    question : StaticOptionContextObjectQuestion
}

interface StaticOptionContextObjectQuestion {
    categories : [],
    questions : QuestionBase[]
}

interface QuestionBase {
    baseq : ContextEventVals,
    propertyq : ContextEventVals 
    optionq : ContextEventVals
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
    public Question : StaticOptionContextObjectQuestion;

    public constructor(data : IStaticOptionContextObjectList, parent :  StaticOptionContextObject) {
        super(data, parent)

        this.ParentRefLevel = data.parent_level;
        this.Question = data.question;
    }

    public async FindChoices() {
        this.Selections = []
        let OptionContextList : ContextObject[] = []

        const RelevantContextObject : ContextObject | null = this.FindContextObject()
        if (RelevantContextObject != null) {
            const [EventRunner] = useGlobalState('eventrunner');

            OptionContextList = await EventRunner.runEvent('optionSearchEvent', RelevantContextObject, [], [], this.Question)

            for (let i = 0; i < OptionContextList.length; i++) {
                this.Selections.push({
                    id: i,
                    value: OptionContextList[i],
                    display_str : OptionContextList[i].GetTrueName()
                })
            }
        }
    }

    public FindContextObject() {
        let baseobject : ContextObject | null = this.MyStaticObject;

        if (baseobject == null) { return null; }
        for (let i = 0; i < this.ParentRefLevel; i++) {
            const tempobject : ContextObject | null = baseobject.MyContext;
            if (tempobject != null) {
                baseobject = tempobject;
            }
        }

        return baseobject;
    }
    
}

export {IStaticOption, StaticOption, IStaticOptionTypeList, StaticOptionTypeList, IStaticOptionContextObjectList, StaticOptionContextObjectList, StaticOptionContextObjectQuestion}