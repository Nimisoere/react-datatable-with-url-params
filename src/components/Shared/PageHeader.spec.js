import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { PageHeader } from "./PageHeader";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    pageId: "test",
    pageTitle: "test",
    isBase: false
  };
  const enzymeWrapper = shallow(<PageHeader {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Page Header", () => {
    it("should render", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
