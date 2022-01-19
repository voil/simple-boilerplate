import '@testing-library/jest-dom';
import CheckboxAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('CheckboxAtom.vue', () => {
  it("should have defualt class CheckboxAtom__input--default", () => {
    const component = render(CheckboxAtom);
    const input = component.getByTestId('checkboxAtomInstance');
    expect(input.className.includes('CheckboxAtom__input--default')).toEqual(true);

    const marker = component.getByTestId('checkboxMarkerAtomInstance');
    expect(marker.className.includes('CheckboxAtom__marker--default')).toEqual(true);
  });

  ['error',
  'default',
  'success',
  'disabled',
  ].forEach(inputType => {
    it(`should have class - InputAtom--${inputType}`, () => {
      const component = render(CheckboxAtom, {
        props: {
          inputType,
        }
      });
      const input = component.getByTestId('checkboxAtomInstance');
      expect(input.className.includes(`CheckboxAtom__input--${inputType}`)).toEqual(true);

      const marker = component.getByTestId('checkboxMarkerAtomInstance');
      expect(marker.className.includes(`CheckboxAtom__marker--${inputType}`)).toEqual(true);
    });
  });
});