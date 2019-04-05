import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Spinner } from "./Spinner";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    float: "float-left",
    size: "20px",
    message: "test",
    className: ""
  };
  const enzymeWrapper = shallow(<Spinner {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Placeholder text", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
