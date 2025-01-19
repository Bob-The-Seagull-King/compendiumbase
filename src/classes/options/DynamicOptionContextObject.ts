import { DynamicContextObject } from "../contextevent/dynamiccontextobject";
import { ICompendiumItemData } from "../CompendiumItem";

interface IDynamicOptionContextObject extends ICompendiumItemData {
}

/*
DynamicOptionContextObjects are solely used to apply Context
to objects with options.

IE, a Block is an option static object, when applied to a part a
BlockInContext object is created with a relevant static object that
handles selecting relevant options.

Should only be concerned with a single Static Object each.
*/
class DynamicOptionContextObject extends DynamicContextObject {}

export {IDynamicOptionContextObject, DynamicOptionContextObject}