import '@testing-library/jest-dom';
import SpinnerAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('SpinnerAtom.vue', () => {
  it("should have not visible message when props not set", () => {
    const component = render(SpinnerAtom);
    expect(component.queryByTestId(/spinnerMessageAtomInstance/)).toBeNull();
  });

  it("should have message test when props message set", () => {
    const component = render(SpinnerAtom, {
      props: {
        message: 'test',
      },
    });
    const message = component.getByTestId('spinnerMessageAtomInstance');
    expect(message).toHaveTextContent('test');
  });
});