import PaginationListComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  pageSize: number;
  currentPage: number;
  totalCount: number;
};

/**
 * Export default component.
 */
export default {
  component: PaginationListComponent,
  title: 'UI/Atoms/Pagination List Atom',
  argTypes: {
    pageSize: {
      name: 'pageSize',
      description: 'Prop for page size.',
    },
    currentPage: {
      name: 'currentPage',
      description: 'Prop for current page.',
    },
    totalCount: {
      name: 'totalCount',
      description: 'Prop for total count list.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Page pagination component.',
      },
      source: {
        code: '<PaginationList :current-page="1" :total-count="100"/>',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const PaginationListAtom = (args: ComponentPropsType) => ({
    components: { PaginationListComponent },
    setup() {
      return { args };
    },
    template: '<PaginationListComponent v-bind="args" />',
});

PaginationListAtom.args = {
  pageSize: 25,
  currentPage: 1,
  totalCount: 1000,
}

