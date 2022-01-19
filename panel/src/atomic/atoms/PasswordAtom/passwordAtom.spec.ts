import '@testing-library/jest-dom';
import PasswordAtom from './index.vue';
import * as fetchMock from 'jest-fetch-mock';
import { render, fireEvent } from '@testing-library/vue';

fetchMock.default.enableMocks();

describe('PasswordAtom.vue', () => {
  it("should have defualt class PasswordAtom--default", () => {
    const component = render(PasswordAtom);
    const input = component.getByTestId('inputAtomInstance');
    expect(input.className.includes('PasswordAtom--default')).toEqual(true);
  });

  ['error',
  'default',
  'success',
  'disabled',
  ].forEach(inputType => {
    it(`should have class - PasswordAtom--${inputType}`, () => {
      const component = render(PasswordAtom, {
        props: {
          inputType,
        }
      });
      const input = component.getByTestId('inputAtomInstance');
      expect(input.className.includes(`PasswordAtom--${inputType}`)).toEqual(true);
    });
  });


  it("should have type text of input when click eye icon", async () => {
    const component = render(PasswordAtom);
    const input = component.getByTestId('inputInputAtomInstance');
    const eye = component.getByTestId('inputEyeAtomInstance');

    await fireEvent(eye,  new MouseEvent('click'));
    expect(input.getAttribute('type')).toEqual('text');

    await fireEvent(eye,  new MouseEvent('click'));
    expect(input.getAttribute('type')).toEqual('password');
  });
});