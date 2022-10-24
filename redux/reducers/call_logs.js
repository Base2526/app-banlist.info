import { ADD_CALL_LOGS, ADD_CALL_LOG, EDIT_CALL_LOG, DELETE_CALL_LOG } from "../../constants"
import _ from "lodash"

const initialState = {
    call_logs: []
}

const call_logs = (state = initialState, action) => {
    console.log("call_logs :", action);
    switch (action.type) {

        case "initialState":{
            return initialState
        }

        case ADD_CALL_LOGS:{
            return { ...state, call_logs:action.data}
        }

        case ADD_CALL_LOG:{
            let call_logs = [...state.call_logs]

            if(!_.find(call_logs, (c)=>c._id == action.data._id)){
                return { ...state, call_logs: [...call_logs, _.omit(action.data, ['type'])] };
            }
            return state
        }

        case EDIT_CALL_LOG:{
            let call_logs = [...state.call_logs]
            return { ...state, call_logs:_.map(call_logs, m=>m._id == action.data.id ? action.data : m) };
        }

        case DELETE_CALL_LOG:{
            let call_logs = [...state.call_logs]
            return { ...state, call_logs:_.filter(call_logs, m=>m._id!==action.data.id) };
        }
    }
    return state
}

export default call_logs;
