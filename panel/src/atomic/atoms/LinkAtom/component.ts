import {
  defineComponent,
} from 'vue';

/**
 * Link
 * Component atom link.
 */
export default defineComponent({
  name: 'LinkAtom',

  props: {
    /**
     * Prop for type of link.
     * @values info, error, warning, primary, disabled.
     */
    linkType: {
      type: String,
      default: 'default',
      validator(prop: string): boolean {
        return [
          'info',
          'error',
          'default',
          'warning',
          'primary',
          'disabled',
        ].includes(prop as string);
      },
    },
  },
});
