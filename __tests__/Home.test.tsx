// __tests__/index.test.jsx
/**
 * @jest-environment jsdom
 */
import React from "react";
import { configure, shallow, render } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import Home from "../pages/index";
import Hero from "../components/home/hero";

configure({ adapter: new EnzymeAdapter() });

const findByTestAttr = (wrapper: any, val: string) =>
    wrapper.find(`[data-test='${val}']`);

it(" should render the Home page without errors", () => {
    const setup = (props = {}) => {
        return shallow(<Home {...props} />);
    };
    const wrapper = setup();
    const homeComp = findByTestAttr(wrapper, "comp-home");
    expect(homeComp.length).toBe(1);
});

it("renders contact button", () => {
    const setup = (props = {}) => {
        return shallow(<Hero {...props} />);
    };
    const wrapper = setup();

    const button = findByTestAttr(wrapper, "contact-button");
    expect(button.length).toBe(1);
});
