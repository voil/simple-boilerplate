import {
  defineComponent,
} from 'vue';

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  inputType: string;
  placeholder: string;
  modelValue: string | number;
}

/**
 * TextareaAtom
 * Component atom input.
 *

 */
export default defineComponent({
  name: 'TextareaAtom',

  emits: [
    'update:modelValue',
  ],

  props: {
    /**
     * Prop for v-model value.
     */
    modelValue: {
      type: [String, Number],
      default: null,
    },

    /**
     * Prop for placeholder value.
     */
    placeholder: {
      type: String,
      default: 'Enter value...',
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
     * @param {InputEvent} event
     */
    function handleInput(event: InputEvent) {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    }

    return {
      handleInput,
    };
  },
});
