import '@testing-library/jest-dom';
import PaginationListAtom from './index.vue';
import { render, fireEvent } from '@testing-library/vue';

describe('PaginationListAtom.vue', () => {
  it('should have active element page 2', async () => {
    const component = render(PaginationListAtom, {
      props: {
        currentPage: 2,
        totalCount: 100,
        pageSize: 25,
      },
    });
    const page = component.queryByText('2');
    expect(page?.className.includes('PaginationListAtom__button--active')).toEqual(true);
  });
});