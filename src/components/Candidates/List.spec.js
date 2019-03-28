import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CardIssuersList } from "./List";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    match: "",
    fetching: false,
    data: {},
    error: {},
    loadData: jest.fn()
  };
  const enzymeWrapper = shallow(<CardIssuersList {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Card Issuer List", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
