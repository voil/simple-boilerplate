import '@testing-library/jest-dom';
import ModalWindowAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('ModalWindowAtom.vue', () => {
  it("should have not header when props title or description not exists", () => {
    const component = render(ModalWindowAtom);
    expect(component.queryByTestId(/modalWindowAtomHeaderInstance/)).toBeNull();
  });


  it("should have title - 'test' when props modalTitle set", () => {
    const component = render(ModalWindowAtom, {
      props: {
        modalTitle: 'test',
      },
    });

    const title = component.getByTestId('modalWindowAtomTitleInstance');
    expect(title).toHaveTextContent('test');
  });

  it("should have description - 'test' when props modalDescription set", () => {
    const component = render(ModalWindowAtom, {
      props: {
        modalDescription: 'test',
      },
    });

    const description = component.getByTestId('modalWindowAtomDescriptionInstance');
    expect(description).toHaveTextContent('test');
  });
});