import MenuMoleculeComponent from './index.vue';
import InputAtomComponent from '@/atomic/atoms/InputAtom/index.vue';


/**
 * @const string[]
 */
 const TypesArray: string[] = [
  'horizontal',
  'vertical',
];

type OptionsMenuType = {
  [props: string]: string,
}

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  options: OptionsMenuType;
};


/**
 * Export default component.
 */
export default {
  component: MenuMoleculeComponent,
  title: 'UI/Molecules/Menu Molecule',
  argTypes: {
    activeKey: {
      name: 'activeKey',
      decription: 'Prop for active key.',
    },
    typeMenu: {
      name: 'typeMenu',
      description: 'Prop for type menu',
      options: TypesArray,
      control: { type: 'select' }
    },
    options: {
      name: 'options',
      description: 'Props for options menu',
    }
  },
  parameters: {
    jest: ['menuMolecule.spec.ts'],
    docs: {
      description: {
        component: 'Menu molecule component.',
      },
      source: {
        code: `
          <MenuMolecule options="{}" />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const MenuMolecule = (args: ComponentPropsType) => ({
    components: { MenuMoleculeComponent, InputAtomComponent },
    setup() {
      return { args };
    },
    template: `
      <MenuMoleculeComponent v-bind="args" />
    `,
});

MenuMolecule.args = {
  typeMenu: 'horizontal',
  options: {
    home: {
      label: 'Home'
    },
    settings: {
      label: 'Settings',
      icon: 'lock'
    }
  }
};
