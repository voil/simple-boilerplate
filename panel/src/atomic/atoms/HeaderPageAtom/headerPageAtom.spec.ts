import '@testing-library/jest-dom';
import HeaderPageAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('HeaderPageAtom.vue', () => {
  it("should have not header when props title or description not exists", () => {
    const component = render(HeaderPageAtom);
    expect(component.queryByTestId(/headerPageAtomInstance/)).toBeNull();
  });


  it("should have title - 'test' when props headerTitle set", () => {
    const component = render(HeaderPageAtom, {
      props: {
        headerTitle: 'test',
      },
    });

    const title = component.getByTestId('headerPageAtomTitleInstance');
    expect(title).toHaveTextContent('test');
  });

  it("should have description - 'test' when props headerDescription set", () => {
    const component = render(HeaderPageAtom, {
      props: {
        headerDescription: 'test',
      },
    });

    const description = component.getByTestId('headerPageDescriptionInstance');
    expect(description).toHaveTextContent('test');
  });
});