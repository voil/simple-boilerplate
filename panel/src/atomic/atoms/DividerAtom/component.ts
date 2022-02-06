import {
  defineComponent,
} from 'vue';

/**
 * Divider
 * Component atom divider.
 *

 */
export default defineComponent({
  name: 'DividerAtom',

  props: {
    /**
     * Color for divider.
     * @type {String|Null}
     */
    color: {
      type: String,
      default: null,
      validator(prop: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(prop);
      },
    },

    /**
     * Prop for type of divider.
     * @values horizontal, vertical
     */
    dividerType: {
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
});
