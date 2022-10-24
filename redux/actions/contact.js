import { ADD_CONTACTS } from "../../constants"

const _add_contacts   = (data) => ({ type: ADD_CONTACTS, data });

export const add_contacts = (data) => (dispatch) => {
    dispatch(_add_contacts(data));
}