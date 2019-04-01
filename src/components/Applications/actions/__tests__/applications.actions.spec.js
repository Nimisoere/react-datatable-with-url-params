import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { applicationActions } from "../applications.actions";
import { applicationConstants } from "../../constants/action.constants";

import fetchMock from "fetch-mock";

import { apiUrls } from "../../../../_constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_APPLICATION_REQUEST when a request is sent", () => {
    fetchMock.getOnce(apiUrls.applications.base, {
      body: { data: [], responseMessage: "success" },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: applicationConstants.GET_APPLICATION_REQUEST },
      {
        type: applicationConstants.GET_APPLICATION_SUCCESS,
        response: { data: [], responseMessage: "success" }
      }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(applicationActions.getAllApplications()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions).toEqual(expectedActions);
    });
  });
  it(`RESET GET_APPLICATION_RESET`, () => {
    const expectedAction = { type: applicationConstants.GET_APPLICATION_RESET };
    expect(applicationActions.resetApplications()).toEqual(expectedAction);
  });
});
