import React from "react";
import { shallow, mount } from "enzyme";
import SendEthContainer from "../containers/send-eth/index";
import SendEthComponent from "../components/send-eth/index";

describe("SendEthContainer", () => {
  test('should render correctly in "debug" mode', () => {
    const component = shallow(<SendEthContainer debug />);

    expect(component).toMatchSnapshot();
  });
});

describe("render props and function calls", () => {
  let component;
  let etherAmount = 1;
  let userAddress = "0x123";
  let acountBalance = 100;
  let loading = false;
  let changeEtherAmount = jest.fn();
  let changeUserAddress = jest.fn();
  let onSend = jest.fn();
  beforeAll(() => {
    component = shallow(
      <SendEthComponent
        etherAmount={etherAmount}
        userAddress={userAddress}
        acountBalance={acountBalance}
        changeEtherAmount={changeEtherAmount}
        changeUserAddress={changeUserAddress}
        onSend={onSend}
        loading={loading}
      />
    );
  });

  test("renders with the passed props", () => {
    expect(component.html()).toMatchSnapshot();
  });
  test("renders ether amount", () => {
    expect(etherAmount).toEqual(
      component
        .find(".send-eth-component_sub-content2-ether input")
        .prop("value")
    );
  });

  test("renders account balance", () => {
    expect(acountBalance.toString()).toEqual(
      component
        .find(".send-eth-component_sub-content1-account-balance p")
        .at(1)
        .text()
    );
  });

  test("renders userAddress", () => {
    expect(userAddress.toString()).toEqual(
      component
        .find(".send-eth-component_sub-content1-user-address input")
        .prop("value")
    );
  });

  test("loading false", () => {
    expect(component.find(".fas fa-spinner fa-pulse").exists()).toBeFalsy();
  });

  test("calls the onSend prop function when clicked footer", () => {
    expect(onSend).not.toHaveBeenCalled();
    component.find("footer").simulate("click");
    expect(onSend).toHaveBeenCalled();
  });

  test("calls changeEtherAmount func", () => {
    const event = { target: { value: "23" } };
    expect(changeEtherAmount).not.toHaveBeenCalled();
    component
      .find(".send-eth-component_sub-content2-ether input")
      .prop("onChange")(event);
    expect(changeEtherAmount).toHaveBeenCalled();
  });

  test("calls changeUserAddress func", () => {
    const event = { target: { value: "23" } };
    expect(changeUserAddress).not.toHaveBeenCalled();
    component
      .find(".send-eth-component_sub-content1-user-address input")
      .simulate("change", event);
    expect(changeUserAddress).toHaveBeenCalled();
  });
});

describe("SendEthContainer mount", () => {
  test("state updated with value of changeEtherAmount box upon change", () => {
    const changeEtherAmount = jest.fn();
    React.useState = jest.fn(() => ["", changeEtherAmount]);
    const component = mount(<SendEthContainer />);
    const event = { target: { value: "10" } };
    component
      .find(".send-eth-component_sub-content2-ether input")
      .simulate("change", event);

    expect(changeEtherAmount).toHaveBeenCalledWith("10");
  });
  test("state updated with value of userAddress box upon change", () => {
    const setUserAddress = jest.fn();
    React.useState = jest.fn(() => ["", setUserAddress]);
    const component = mount(<SendEthContainer />);
    const event = { target: { value: "11" } };
    component
      .find(".send-eth-component_sub-content1-user-address input")
      .simulate("change", event);
    expect(setUserAddress).toHaveBeenCalledWith("11");
  });
});
