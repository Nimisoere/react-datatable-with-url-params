import { combineReducers } from "redux";

import { alert } from "../components/Alert/reducers/alert.reducer";
import { applications } from "../components/Applications/reducers/applications.reducers";

export default combineReducers({
  alert,
  applications
});
