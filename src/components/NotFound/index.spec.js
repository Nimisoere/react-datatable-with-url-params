import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NotFound } from "./index";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {};
  const enzymeWrapper = shallow(<NotFound {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Not Found", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
