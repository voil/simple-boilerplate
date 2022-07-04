import {
  defineComponent,
} from 'vue';

/**
 * TagAtom
 * Component atom tag.
 *

 */
export default defineComponent({
  name: 'TagAtom',

  props: {
    /**
     * Prop for type tag.
     * @values error, default, success, disabled, warning, info.
     */
    tagType: {
      type: String,
      default: 'default',
      validator(prop: string): boolean {
        return [
          'info',
          'error',
          'default',
          'success',
          'warning',
          'disabled',
        ].includes(prop as string);
      },
    },
  },
});
