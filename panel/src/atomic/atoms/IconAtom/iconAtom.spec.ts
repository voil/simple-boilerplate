import '@testing-library/jest-dom';
import IconAtom from './index.vue';
import * as fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/vue';

fetchMock.default.enableMocks();

describe('IconAtom.vue', () => {
  it("should have class - IconAtom--default", () => {
    const component = render(IconAtom, {
      props: {
        name: 'success',
      },
    });
    const icon = component.getByTestId('iconAtomInstance');
    expect(icon.className.includes('IconAtom--default')).toEqual(true);
  });

  it("should not have class - IconAtom--default when props color set", () => {
    const component = render(IconAtom, {
      props: {
        name: 'success',
        color: '#000000',
      },
    });
    const icon = component.getByTestId('iconAtomInstance');
    expect(icon.className.includes('IconAtom--default')).toEqual(false);
  });
});