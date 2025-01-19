import { Requester } from '../Requester';
import { IStaticOption , IStaticOptionContextObjectList, IStaticOptionTypeList, StaticOption, StaticOptionContextObjectList, StaticOptionTypeList } from '../../classes/options/StaticOption'

class StaticOptionFactory {

    /**
     * Creates an ability based on provided data
     * @param _ability The data in I format describing the object
     * @returns A newly created object
     */
    static CreateStaticOption(_option: IStaticOption) {

        if (_option.category == "type") {
            const option = new StaticOptionTypeList(_option as IStaticOptionTypeList)
            return option;
        }

        if (_option.category == "contextobject") {
            const option = new StaticOptionContextObjectList(_option as IStaticOptionContextObjectList)
            return option;
        }

        const option = new StaticOption(_option)
        return option;
    }
}

export {StaticOptionFactory}