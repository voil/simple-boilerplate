import '@testing-library/jest-dom';
import TextareaAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('TextareaAtom.vue', () => {
  it("should have defualt class TextareaAtom--default", () => {
    const component = render(TextareaAtom);
    const input = component.getByTestId('textareaAtomInstance');
    expect(input.className.includes('TextareaAtom--default')).toEqual(true);
  });

  ['error',
  'default',
  'success',
  'disabled',
  ].forEach(inputType => {
    it(`should have class - TextareaAtom--${inputType}`, () => {
      const component = render(TextareaAtom, {
        props: {
          inputType,
        }
      });
      const input = component.getByTestId('textareaAtomInstance');
      expect(input.className.includes(`TextareaAtom--${inputType}`)).toEqual(true);
    });
  });

  it("should have placeholder - 'test' when props placeholder set", () => {
    const component = render(TextareaAtom, {
      props: {
        placeholder: 'test',
      }
    });

    const input = component.getByTestId('textareaInputAtomInstance');
    expect(input.getAttribute('placeholder')).toEqual('test');
  });

  it("should have input disabled when props inputType set on disabled", () => {
    const component = render(TextareaAtom, {
      props: {
        inputType: 'disabled',
      }
    });

    const input = component.getByTestId('textareaInputAtomInstance');
    expect(input.getAttribute('disabled')).not.toBeNull();
  });
});