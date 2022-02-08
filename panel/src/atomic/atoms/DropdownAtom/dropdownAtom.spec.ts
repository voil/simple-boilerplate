import '@testing-library/jest-dom';
import DropdownAtom from './index.vue';
import * as fetchMock from 'jest-fetch-mock';
import { render, fireEvent } from '@testing-library/vue';

fetchMock.default.enableMocks();

describe('DropdownAtom.vue', () => {
  it("should have on default overlayer hidden.", async () => {
    const component = render(DropdownAtom);
    expect(component.queryByTestId(/dropdownAtomOverlayerInstance/)).toBeNull();
  });

  it("should have show overlayer when click button", async () => {
    const component = render(DropdownAtom);

    const dropdown = component.getByTestId('dropdownAtomInstance');

    await fireEvent(dropdown,  new MouseEvent('click'));
    expect(component.queryByTestId(/dropdownAtomOverlayerInstance/)).not.toBeNull();
  });

  it("should have default left pisition overlayer", async () => {
    const component = render(DropdownAtom);

    const dropdown = component.getByTestId('dropdownAtomInstance');

    await fireEvent(dropdown,  new MouseEvent('click'));
    const overlayer = component.getByTestId('dropdownAtomOverlayerInstance');
    expect(overlayer.className.includes('DropdownAtom__overlayer--left')).toEqual(true);
  });

  it("should have right pisition overlayer", async () => {
    const component = render(DropdownAtom, {
      props: {
        positionOverlayer: 'right'
      },
    });

    const dropdown = component.getByTestId('dropdownAtomInstance');

    await fireEvent(dropdown,  new MouseEvent('click'));
    const overlayer = component.getByTestId('dropdownAtomOverlayerInstance');
    expect(overlayer.className.includes('DropdownAtom__overlayer--right')).toEqual(true);
  });
});