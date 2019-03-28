import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ManageCardIssuers } from "./index";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    match: "",
    fetching: false,
    fetched: false,
    response: {},
    error:{},
    getCardIssuers: jest.fn()
  };
  const enzymeWrapper = shallow(<ManageCardIssuers {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Card Issuer Page", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
