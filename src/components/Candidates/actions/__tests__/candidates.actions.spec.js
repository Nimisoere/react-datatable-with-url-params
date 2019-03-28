import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { cardIssuerActions } from "../cardissuers.actions";
import { cardIssuersConstants } from "../../constants/action.constants";
import { alertConstants } from "../../../Alert/constants/alert.constants";

import fetchMock from "fetch-mock";

import { apiUrls } from "../../../../_constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_CARDISSUERS_SUCCESS when a request is sent", () => {
    fetchMock.getOnce(apiUrls.issuers.base, {
      body: { data: [], responseMessage: "success" },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: cardIssuersConstants.GET_CARDISSUERS_REQUEST },
      {
        type: cardIssuersConstants.GET_CARDISSUERS_SUCCESS,
        response: { data: [], responseMessage: "success" }
      }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(cardIssuerActions.getAllCardIssuers()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions).toEqual(expectedActions);
    });
  });

  it("creates VIEW_CARDISSUER_success when a request is sent", () => {
    fetchMock.getOnce(`${apiUrls.issuers.base}/44`, {
      body: { data: [], responseMessage: "success" },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: cardIssuersConstants.VIEW_CARDISSUER_REQUEST, id: 44 },
      {
        type: cardIssuersConstants.VIEW_CARDISSUER_SUCCESS,
        response: { data: [], responseMessage: "success" }
      }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(cardIssuerActions.getCardIssuer(44)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions).toEqual(expectedActions);
    });
  });

  it("creates ADD_CARDISSUER_success when a request is sent", () => {
    fetchMock.postOnce(apiUrls.issuers.base, {
      body: { data: [], responseMessage: "success" },
      headers: { "content-type": "application/json" }
    });
    fetchMock.getOnce(`${apiUrls.issuers.base}`, {
      body: { data: [], responseMessage: "success" },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { requestBody: {}, type: cardIssuersConstants.ADD_CARDISSUER_REQUEST },
      {
        response: { data: [], responseMessage: "success" },
        type: cardIssuersConstants.ADD_CARDISSUER_SUCCESS
      },
      { type: cardIssuersConstants.GET_CARDISSUERS_REQUEST },
      {
        message: "success",
        section: "Add card issuer",
        type: alertConstants.SUCCESS
      },
      { type: cardIssuersConstants.ADD_CARDISSUER_RESET },
      { type: cardIssuersConstants.VIEW_CARDISSUER_RESET }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(cardIssuerActions.addCardIssuer({})).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(6);
      expect(actions).toEqual(expectedActions);
    });
  });
  it(`RESET VIEW_CARD_ISSUER`, () => {
    const expectedAction = { type: cardIssuersConstants.VIEW_CARDISSUER_RESET };
    expect(cardIssuerActions.resetCardIssuer()).toEqual(expectedAction);
  });
  it(`RESET ADD_CARD_ISSUER`, () => {
    const expectedAction = { type: cardIssuersConstants.ADD_CARDISSUER_RESET };
    expect(cardIssuerActions.resetAddCardIssuer()).toEqual(expectedAction);
  });
});
