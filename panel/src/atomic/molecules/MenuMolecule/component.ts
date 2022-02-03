import {
  PropType,
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * @var {OptionType}
 */
type OptionType = {
  lable: string;
  icon?: string;
}

/**
 * @var {OptionsType}
 */
type OptionsType = {
  [key: string]: OptionType;
}

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  options: OptionsType;
}

/**
 * Menu Molecule
 * Component molecule menu.
 *
 */
export default defineComponent({
  name: 'MenuMolecule',

  components: {
    IconAtom: defineAsyncComponent(() => import('@/atomic/atoms/IconAtom/index.vue')),
  },

  props: {
    /**
     * Prop for active key.
     */
    activeKey: {
      type: String,
      default: null,
    },

    /**
     * Prop for options menu.
     */
    options: {
      type: Object as PropType<OptionsType>,
      default: () => ({}),
    },

    /**
     * Prop for type menu.
     * @values horizontal, vertical
     */
    typeMenu: {
      type: String,
      default: 'horizontal',
      validator(prop: string): boolean {
        return [
          'vertical',
          'horizontal',
        ].includes(prop as string);
      },
    },
  },

  emits: ['handleClickElementMenu'],
});
