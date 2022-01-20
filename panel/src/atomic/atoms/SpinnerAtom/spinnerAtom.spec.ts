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
        isVisible: true,
      },
    });
    const message = component.getByTestId('spinnerMessageAtomInstance');
    expect(message).toHaveTextContent('test');
  });

  it("should have visible when props isVisible to true", () => {
    const component = render(SpinnerAtom, {
      props: {
        isVisible: true,
        message: 'test',
      },
    });
    expect(component.queryByTestId(/spinnerSpinnerAtomInstance/)).not.toBeNull();
    expect(component.queryByTestId(/spinnerMaskAtomInstance/)).not.toBeNull();
    expect(component.queryByTestId(/spinnerMessageAtomInstance/)).not.toBeNull();
  });

  it("should have add class SpinnerAtom__content--visible when spinner props isVisible true", () => {
    const component = render(SpinnerAtom, {
      props: {
        isVisible: true,
        message: 'test',
      },
    });
    const content = component.getByTestId('spinnerContentAtomInstance');
    expect(content.className.includes('SpinnerAtom__content--visible')).toEqual(true);
  });
});