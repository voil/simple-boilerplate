import {
  defineComponent,
} from 'vue';

/**
 * Button
 * Component atom button.
 *

 */
export default defineComponent({
  name: 'ButtonAtom',

  props: {
    /**
     * Prop for type of button.
     * @values info, error, warning, primary, disabled.
     */
    buttonType: {
      type: String,
      default: 'primary',
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
