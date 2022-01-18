import '@testing-library/jest-dom';
import InputAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('InputAtom.vue', () => {
  it("should have defualt class InputAtom--default", () => {
    const component = render(InputAtom);
    const input = component.getByTestId('inputAtomInstance');
    expect(input.className.includes('InputAtom--default')).toEqual(true);
  });

  ['error',
  'default',
  'success',
  'disabled',
  ].forEach(inputType => {
    it(`should have class - InputAtom--${inputType}`, () => {
      const component = render(InputAtom, {
        props: {
          inputType,
        }
      });
      const input = component.getByTestId('inputAtomInstance');
      expect(input.className.includes(`InputAtom--${inputType}`)).toEqual(true);
    });
  });

  it("should have placeholder - 'test' when props placeholder set", () => {
    const component = render(InputAtom, {
      props: {
        placeholder: 'test',
      }
    });

    const input = component.getByTestId('inputInputAtomInstance');
    expect(input.getAttribute('placeholder')).toEqual('test');
  });

  it("should have input disabled when props inputType set on disabled", () => {
    const component = render(InputAtom, {
      props: {
        inputType: 'disabled',
      }
    });

    const input = component.getByTestId('inputInputAtomInstance');
    expect(input.getAttribute('disabled')).not.toBeNull();
  });
});