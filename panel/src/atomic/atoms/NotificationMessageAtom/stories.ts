import NotificationMessageAtomComponent from './index.vue';

/**
 * @const string[]
 */
const TypesArray: string[] = [
  'error',
  'success',
];

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  name: string;
  color: string;
};

/**
 * Export default component.
 */
export default {
  component: NotificationMessageAtomComponent,
  title: 'UI/Atoms/Notification Message Atom',
  argTypes: {
    notificationType: {
      name: 'notificationType',
      default: 'success',
      description: 'Prop for type of notification.',
      options: TypesArray,
      control: { type: 'select' }
    },
    notificationTitle: {
      name: 'notificationTitle',
      description: 'Prop for title notification.',
    },
    notificationDescription: {
      name: 'notificationDescription',
      description: 'Prop for description notification.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Component atom notification message.',
      },
      source: {
        code: '<NotificationMessageAtom name="success" />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const NotificationMessageAtom = (args: ComponentPropsType) => ({
    components: { NotificationMessageAtomComponent },
    setup() {
      return { args };
    },
    template: '<NotificationMessageAtomComponent v-bind="args" />',
});

/**
 * Aassign defualt arguments for controls.
 */
NotificationMessageAtom.args = {
  notificationType: 'success',
  notificationTitle: 'Lorem Ipsum',
  notificationDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet justo lacus. Aenean mi turpis, rutrum eget malesuada eu, fermentum a lectus.',
};