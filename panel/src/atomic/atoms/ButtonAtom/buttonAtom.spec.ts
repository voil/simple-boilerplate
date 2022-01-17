import '@testing-library/jest-dom';
import ButtonAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('ButtonAtom.vue', () => {
  it("should have class - ButtonAtom--primary", () => {
    const component = render(ButtonAtom);
    const button = component.getByTestId('buttonAtomInstance');
    expect(button.className.includes('ButtonAtom--primary')).toEqual(true);
  });

  ['info',
  'error',
  'default',
  'warning',
  'primary',
  'disabled'
  ].forEach(buttonType => {
    it(`should have class - ButtonAtom--${buttonType}`, () => {
      const component = render(ButtonAtom, {
        props: {
          buttonType,
        }
      });
      const button = component.getByTestId('buttonAtomInstance');
      expect(button.className.includes(`ButtonAtom--${buttonType}`)).toEqual(true);
    });
  });
});