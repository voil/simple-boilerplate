import {
  ref,
  Ref,
  watch,
  onBeforeMount,
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
 * @type PropsComponentType
 */
type IconType = {
  [text: string]: string;
  password: string;
}

/**
 * PasswordAtom
 * Component atom password.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'PasswordAtom',

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
    const iconInstance: Ref<null | string> = ref<null | string>(null);

    /**
     * Variable to set type of input.
     * @var {Ref<string>}
     */
    const typeInput: Ref<string> = ref<string>('password');

    /**
     * Variable of types icons.
     * @var {IconType}
     */
    const typeIcon: IconType = {
      text: 'eye-visibility',
      password: 'eye-hidden',
    };

    /**
     * Method to set icon instance.
     * @return {Promise<void>}
     */
    async function setIconInstance(): Promise<void> {
      iconInstance.value = await (await fetch(`/assets/icons/${typeIcon[typeInput.value]}.svg`)).text();
    }

    /**
     * Function to handle input type.
     * @param InputEvent event
     */
    function handleInput(event: InputEvent) {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    }

    /**
     * Function fired before componenent mounted.
     */
    onBeforeMount(() => setIconInstance());

    /**
     * Watch props typeInput is change.
     */
    watch(() => typeInput.value, () => setIconInstance());

    /**
     * Toogle state type of input password.
     */
    function tooglePasswordVisibility() {
      typeInput.value = typeInput.value === 'password' ? 'text' : 'password';
    }

    return {
      typeInput,
      handleInput,
      iconInstance,
      tooglePasswordVisibility,
    };
  },
});
