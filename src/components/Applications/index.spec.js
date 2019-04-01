import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ManageApplications } from "./index";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    match: "",
    fetching: false,
    fetched: false,
    response: {},
    error: {},
    getApplications: jest.fn()
  };
  const enzymeWrapper = shallow(<ManageApplications {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Applications Page", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
