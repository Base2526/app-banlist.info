import { combineReducers } from "redux";

import auth from "./auth"
import ws from "./ws"
import call_logs from "./call_logs"
import sms from "./sms"
import contact from "./contact"

export default combineReducers({
    auth,
    ws,
    call_logs,
    sms,
    contact
});