import { IStaticContextObject, StaticContextObject } from "../contextevent/staticcontextobject";

interface IStaticOptionContextObject extends IStaticContextObject {
}

/*
StaticOptionContextObjects are static objects which contain some
number of options to select from, generated upon construction.

Some Options include questions to generate selection options, which
use this object to grab the relevant context source for event handling.
*/
class StaticOptionContextObject extends StaticContextObject {}

export {IStaticOptionContextObject, StaticOptionContextObject}