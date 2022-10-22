import { ADD_SMS, EDIT_SMS, DELETE_SMS } from "../../constants"
import _ from "lodash"

const initialState = {
    sms: []
}

const sms = (state = initialState, action) => {
    console.log("sms :", action);
    switch (action.type) {

        case "initialState":{
            return initialState
        }

        case ADD_SMS:{
            let sms = [...state.sms]

            if(!_.find(sms, (c)=>c._id == action.data._id)){
                return { ...state, sms: [...sms, _.omit(action.data, ['type'])] };
            }
            return state
        }

        case EDIT_SMS:{
            let sms = [...state.sms]
            return { ...state, sms:_.map(sms, m=>m._id == action.data.id ? action.data : m) };
        }

        case DELETE_SMS:{
            let sms = [...state.sms]
            return { ...state, sms:_.filter(sms, m=>m._id!==action.data.id) };
        }
    }

    return state
}

export default sms;
