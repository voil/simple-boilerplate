import AlertAtomComponent from './index.vue';

/**
 * @const string[]
 */
 const TypesArray: string[] = [
  'info',
  'error',
  'warning',
  'success',
];

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  alertType: string;
  alertTitle: string;
  alertDescription: string;
};


/**
 * Export default component.
 */
export default {
  component: AlertAtomComponent,
  title: 'UI/Atoms/Alert Atom',
  argTypes: {
    alertType: {
      name: 'alertType',
      description: 'Prop for type of alert.',
      options: TypesArray,
      control: { type: 'select' }
    },
    alertTitle: {
      name: 'alertTitle',
      description: 'Prop for title alert.', 
    },
    alertDescription: {
      name: 'alertDescription',
      description: 'Prop for descrption alert.', 
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Alert atom component.',
      },
      source: {
        code: `
          <AlertAtom alert-title="LotemIpsum"/>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const AlertAtom = (args: ComponentPropsType) => ({
    components: { AlertAtomComponent },
    setup() {
      return { args };
    },
    template: `
      <AlertAtomComponent v-bind="args" />
    `,
});

AlertAtom.args = {
  alertType: 'success',
  alertTitle: 'Lorem ipsum',
  alertDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet justo lacus. Aenean mi turpis, rutrum eget malesuada eu, fermentum a lectus. Sed pulvinar ante ut sapien rutrum ultricies vitae sit amet ipsum. '
}
