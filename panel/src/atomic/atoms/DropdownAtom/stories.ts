import DropdownAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: DropdownAtomComponent,
  title: 'UI/Atoms/Dropdown Atom',
  decorators: [() => ({ template: '<div style="padding-left: 200px"><story/></div>' })],
  argTypes: {},
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