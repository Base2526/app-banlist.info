import { ADD_CALL_LOGS, ADD_CALL_LOG, EDIT_CALL_LOG, DELETE_CALL_LOG } from "../../constants"

const _add_call_logs   = (data) => ({ type: ADD_CALL_LOGS, data });
const _add_call_log    = (data) => ({ type: ADD_CALL_LOG, data });
const _edit_call_log   = (data) => ({ type: EDIT_CALL_LOG, data });
const _delete_call_log = (data) => ({ type: DELETE_CALL_LOG, data });

export const add_call_logs = (data) => (dispatch) => {
    dispatch(_add_call_logs(data));
}

export const add_call_log = (data) => (dispatch) => {
    dispatch(_add_call_log(data));
}

export const edit_call_log = (data) => (dispatch) => {
    dispatch(_edit_call_log(data));
}

export const delete_call_log = (data) => (dispatch) => {
    dispatch(_delete_call_log(data));
}