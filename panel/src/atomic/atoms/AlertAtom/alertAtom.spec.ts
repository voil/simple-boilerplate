import '@testing-library/jest-dom';
import AlertAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('AlertAtom.vue', () => {
  it("should have not visible alert when title or description pros not set", () => {
    const component = render(AlertAtom);
    expect(component.queryByTestId(/alertAtomInstance/)).toBeNull();
  });

  it("should have class - AlertAtom--success", () => {
    const component = render(AlertAtom, {
      props: {
        alertTitle: 'test',
      },
    });
    const alert = component.getByTestId('alertAtomInstance');
    expect(alert.className.includes('AlertAtom--success')).toEqual(true);
  });

  ['info',
  'error',
  'warning',
  'success',
  ].forEach(alertType => {
    it(`should have class - AlertAtom--${alertType}`, () => {
      const component = render(AlertAtom, {
        props: {
          alertType,
          alertTitle: 'test'
        }
      });
      const alert = component.getByTestId('alertAtomInstance');
      expect(alert.className.includes(`AlertAtom--${alertType}`)).toEqual(true);
    });
  });

  it("should have title - 'test' when props alertTitle set", () => {
    const component = render(AlertAtom, {
      props: {
        alertTitle: 'test',
      },
    });
    const title = component.getByTestId('alertTitleAtomInstance');
    expect(title).toHaveTextContent('test');
  });

  it("should have description - 'test' when props alertDescription set", () => {
    const component = render(AlertAtom, {
      props: {
        alertDescription: 'test',
      },
    });
    const description = component.getByTestId('alertDescriptionAtomInstance');
    expect(description).toHaveTextContent('test');
  });
});