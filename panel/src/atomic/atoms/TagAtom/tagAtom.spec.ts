import '@testing-library/jest-dom';
import TagAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('TagAtom.vue', () => {
  it("should have defualt class TagAtom--default", () => {
    const component = render(TagAtom);
    const tag = component.getByTestId('TagAtomInstance');
    expect(tag.className.includes('TagAtom--default')).toEqual(true);
  });

  ['info',
  'error',
  'default',
  'success',
  'warning',
  'disabled',
  ].forEach(tagType => {
    it(`should have class - TagAtom--${tagType}`, () => {
      const component = render(TagAtom, {
        props: {
          tagType,
        }
      });
      const input = component.getByTestId('TagAtomInstance');
      expect(input.className.includes(`TagAtom--${tagType}`)).toEqual(true);
    });
  });
});