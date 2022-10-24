import { ADD_CONTACTS } from "../../constants"
import _ from "lodash"

const initialState = {
    contacts: []
}

const contact = (state = initialState, action) => {
    console.log("contact :", action);
    switch (action.type) {

        case "initialState":{
            return initialState
        }

        case ADD_CONTACTS:{
            return { ...state, contacts:action.data}
        }       
    }
    return state
}

export default contact;
