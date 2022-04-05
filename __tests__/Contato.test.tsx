// __tests__/index.test.jsx
/**
 * @jest-environment jsdom
 */
import React from "react";
import { configure, shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import Cursos from "../pages/cursos";
{
    /* import Hero from "../components/home/hero "; */
}

configure({ adapter: new EnzymeAdapter() });

const findByTestAttr = (wrapper: any, val: string) =>
    wrapper.find(`[data-test='${val}']`);

it(" should render the Cursos page without errors", () => {
    const setup = (props = {}) => {
        return shallow(<Cursos {...props} />);
    };
    const wrapper = setup();
    const homeComp = findByTestAttr(wrapper, "comp-cursos");
    expect(homeComp.length).toBe(1);
});
