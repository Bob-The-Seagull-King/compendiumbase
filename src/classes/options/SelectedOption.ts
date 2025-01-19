
interface ISelectedOption {
}

/*
In a DynamicOptionContextObject, each option in the respective
StaticOptionContextObject has a corresponding SelectedOption, which
contains the StaticOption, a reference to the relevant StaticOptionContextObject,
and option-selection tech.
*/
class SelectedOption {}

export {ISelectedOption, SelectedOption}