import '@testing-library/jest-dom';
import NotificationMessageAtom from './index.vue';
import { render } from '@testing-library/vue';

describe('NotificationMessageAtom.vue', () => {
  it("should have class - NotificationMessageAtom--success", () => {
    const component = render(NotificationMessageAtom);
    const notification = component.getByTestId('notificationMessageAtomInstance');
    expect(notification.className.includes('NotificationMessageAtom--success')).toEqual(true);
  });

  ['success','error']
    .forEach(notificationType => {
    it(`should have class - NotificationMessageAtom--${notificationType}`, () => {
      const component = render(NotificationMessageAtom, {
        props: {
          notificationType,
        }
      });
      const notification = component.getByTestId('notificationMessageAtomInstance');
      expect(notification.className.includes(`NotificationMessageAtom--${notificationType}`)).toEqual(true);
    });
  });

  it("should have not visible title when props notificationTitle not set", () => {
    const component = render(NotificationMessageAtom);
    expect(component.queryByTestId(/notificationMessageTitleAtomInstance/)).toBeNull();
  });

  it("should have  visible title and text = 'test' when props notificationTitle set", () => {
    const component = render(NotificationMessageAtom, {
      props: {
        notificationTitle: 'test',
      },
    });

    const notificationTitle = component.getByTestId('notificationMessageTitleAtomInstance');
    expect(notificationTitle).toHaveTextContent('test');
  });

  it("should have not visible title when props notificationDescription not set", () => {
    const component = render(NotificationMessageAtom);
    expect(component.queryByTestId(/notificationMessageDescriptionAtomInstance/)).toBeNull();
  });

  it("should have  visible title and text = 'test' when props notificationDescription set", () => {
    const component = render(NotificationMessageAtom, {
      props: {
        notificationDescription: 'test',
      },
    });

    const notificationDescription = component.getByTestId('notificationMessageDescriptionAtomInstance');
    expect(notificationDescription).toHaveTextContent('test');
  });
});