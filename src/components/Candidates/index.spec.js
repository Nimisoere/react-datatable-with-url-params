import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ManageCandidates } from "./index";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    match: "",
    fetching: false,
    fetched: false,
    response: {},
    error: {},
    getCandidates: jest.fn()
  };
  const enzymeWrapper = shallow(<ManageCandidates {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Candidates Page", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
