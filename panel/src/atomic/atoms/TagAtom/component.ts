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
     * @values error, default, success, disabled.
     */
    tagType: {
      type: String,
      default: 'default',
      validator(prop: string): boolean {
        return [
          'error',
          'default',
          'success',
          'disabled',
        ].includes(prop as string);
      },
    },
  },
});
