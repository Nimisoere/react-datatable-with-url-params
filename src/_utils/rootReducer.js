import { combineReducers } from "redux";

import { alert } from "../components/Alert/reducers/alert.reducer";
import { candidates } from "../components/Candidates/reducers/candidates.reducers";

export default combineReducers({
  alert,
  candidates
});
