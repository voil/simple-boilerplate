import { defineComponent } from 'vue';

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  inputType: string;
  modelValue: boolean;
}

/**
 * CheckboxAtom
 * Component atom checkbox.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'CheckboxAtom',

  emits: [
    'update:modelValue',
  ],

  props: {
    /**
     * Prop for v-model value.
     */
    modelValue: {
      type: Boolean,
      default: null,
    },

    /**
     * Prop for type input.
     * @values error, default, success, disabled.
     */
    inputType: {
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

  /**
   * Main setup method for componenent.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
  setup(props: Readonly<PropsComponentType>, { emit }): Record<string, unknown> {
    /**
     * Function to handle input event.
     * @param InputEvent event
     */
    const handleInput = (event: InputEvent) => (props.inputType !== 'disabled'
      ? emit('update:modelValue', (event.target as HTMLInputElement).checked) : null);

    return {
      handleInput,
    };
  },
});
