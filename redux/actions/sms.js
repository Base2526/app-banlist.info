import { ADD_SMS, EDIT_SMS, DELETE_SMS } from "../../constants"

const _add_sms    = (data) => ({ type: ADD_SMS, data });
const _edit_sms   = (data) => ({ type: EDIT_SMS, data });
const _delete_sms = (data) => ({ type: DELETE_SMS, data });

export const add_sms = (data) => (dispatch) => {
    dispatch(_add_sms(data));
}

export const edit_sms = (data) => (dispatch) => {
    dispatch(_edit_sms(data));
}

export const delete_sms = (data) => (dispatch) => {
    dispatch(_delete_sms(data));
}