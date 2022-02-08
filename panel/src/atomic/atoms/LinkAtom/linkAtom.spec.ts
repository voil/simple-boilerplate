import '@testing-library/jest-dom';
import LinkAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('LinkAtom.vue', () => {
  it("should have class - LinkAtom--default", () => {
    const component = render(LinkAtom);
    const link = component.getByTestId('linkAtomInstance');
    expect(link.className.includes('LinkAtom--default')).toEqual(true);
  });

  ['info',
  'error',
  'default',
  'warning',
  'primary',
  'disabled'
  ].forEach(linkType => {
    it(`should have class - LinkAtom--${linkType}`, () => {
      const component = render(LinkAtom, {
        props: {
          linkType,
        }
      });
      const link = component.getByTestId('linkAtomInstance');
      expect(link.className.includes(`LinkAtom--${linkType}`)).toEqual(true);
    });
  });
});