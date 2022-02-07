import '@testing-library/jest-dom';
import PageListSizerAtom from './index.vue';
import { render, fireEvent } from '@testing-library/vue';

describe('PageListSizerAtom.vue', () => {
  [10,25,50,100].forEach((size) => {
    it(`should have defualt size element item ${size}`, () => {
      const component = render(PageListSizerAtom);
      expect(component.queryByText(size)).not.toBeNull();
    });
  });

  it('should have one element options 10', () => {
    const component = render(PageListSizerAtom, {
      props: {
        optionsSizer: [10]
      },
    });
    expect(component.queryByText('10')).not.toBeNull();
  });

  it('should have active element option size 50', async () => {
    const component = render(PageListSizerAtom);
    const size = component.queryByText('50');
    
    await fireEvent(size as HTMLElement,  new MouseEvent('click'));
    expect(size?.className.includes('PageListSizer__item--active')).toEqual(true);
  });
});