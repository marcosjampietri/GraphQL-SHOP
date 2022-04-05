// __tests__/index.test.jsx
/**
 * @jest-environment jsdom
 */
import React from "react";
import { configure, shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import Sobre from "../pages/sobre";
{
    /* import Hero from "../components/home/hero "; */
}

configure({ adapter: new EnzymeAdapter() });

const findByTestAttr = (wrapper: any, val: string) =>
    wrapper.find(`[data-test='${val}']`);

it(" should render the Sobre page without errors", () => {
    const setup = (props = {}) => {
        return shallow(<Sobre {...props} />);
    };
    const wrapper = setup();
    const homeComp = findByTestAttr(wrapper, "comp-sobre");
    expect(homeComp.length).toBe(1);
});
