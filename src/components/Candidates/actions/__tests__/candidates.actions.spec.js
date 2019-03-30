import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { candidateActions } from "../candidates.actions";
import { candidateConstants } from "../../constants/action.constants";

import fetchMock from "fetch-mock";

import { apiUrls } from "../../../../_constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_CANDIDATE_REQUEST when a request is sent", () => {
    fetchMock.getOnce(apiUrls.issuers.base, {
      body: { data: [], responseMessage: "success" },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: candidateConstants.GET_CANDIDATE_REQUEST },
      {
        type: candidateConstants.GET_CANDIDATE_SUCCESS,
        response: { data: [], responseMessage: "success" }
      }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(candidateActions.getAllCandidates()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions).toEqual(expectedActions);
    });
  });
  it(`RESET GET_CANDIDATE_RESET`, () => {
    const expectedAction = { type: candidateConstants.GET_CANDIDATE_RESET };
    expect(candidateActions.resetCandidates()).toEqual(expectedAction);
  });
});
