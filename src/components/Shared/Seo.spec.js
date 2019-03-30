import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Seo} from "./Seo";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    text: "test",
    blur: true
  };
  const enzymeWrapper = shallow(<Seo {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("SEO", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
