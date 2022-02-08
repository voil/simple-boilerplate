import DropdownAtomComponent from './index.vue';

/**
 * @const string[]
 */
const PositionArray: string[] = [
  'left',
  'right',
];

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  positionOverlayer: string;
};



/**
 * Export default component.
 */
export default {
  component: DropdownAtomComponent,
  title: 'UI/Atoms/Dropdown Atom',
  decorators: [() => ({ template: '<div style="padding-left: 200px"><story/></div>' })],
  argTypes: {
    hideOnClick: {
      name: 'hideOnClick',
      description: 'Prop for handle hide on click.',
    },
    positionOverlayer: {
      name: 'positionOverlayer',
      description: 'Prop for type of divider.',
      options: PositionArray,
      control: { type: 'select' }
    },
  },
  parameters: {
    jest: ['dropdownAtom.spec.ts'],
    docs: {
      description: {
        component: 'Dropdown component.',
      },
      source: {
        code: `<DropdownAtom>
        Lorem ipsum
        <template #overlayer>Overlayer</template>
        </DropdownAtom>`,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const DropdownAtom = (args: ComponentPropsType) => ({
    components: { DropdownAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <DropdownAtomComponent v-bind="args">
      Lorem ipsum
      <template #overlayer>Lorem ispum</template>
    </DropdownAtomComponent>
    `,
});

DropdownAtom.args = {
  positionOverlayer: 'left',
  hideOnClick: true,
}