import {
  reactive,
  PropType,
  computed,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
} from 'vue';
import LoginFormStateMachine, { LoginFormParamsType } from '@/composable/store/machines/authorization/loginFormStateMachine';

/**
 * @var {ErrorMessageType}
 */
type ErrorMessageType = {
  email: string | null;
  password: string | null;
}

/**
 * @var {PropsInputType}
 */
type PropsInputType = {
  label: string,
  placeholder: string,
};

/**
 * @var {AlertType}
 */
type AlertType = {
  title: string,
  description: string,
}

/**
 * @var {AlertsType}
 */
type AlertsType = {
  error: AlertType,
  success: AlertType,
};

/**
 * @var {TextType}
 */
type TextType = {
  email: PropsInputType,
  password: PropsInputType,
  button: string,
  spinnerMessage: string,
  alerts: AlertsType,
};

/**
 * Login Form Organism
 * Component organism login form.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'LoginFormOrganism',

  components: {
    AlertAtom: defineAsyncComponent(() => import('@/atomic/atoms/AlertAtom/index.vue')),
    InputAtom: defineAsyncComponent(() => import('@/atomic/atoms/InputAtom/index.vue')),
    ButtonAtom: defineAsyncComponent(() => import('@/atomic/atoms/ButtonAtom/index.vue')),
    SpinnerAtom: defineAsyncComponent(() => import('@/atomic/atoms/SpinnerAtom/index.vue')),
    PasswordAtom: defineAsyncComponent(() => import('@/atomic/atoms/PasswordAtom/index.vue')),
    FormItemMolecule: defineAsyncComponent(() => import('@/atomic/molecules/FormItemMolecule/index.vue')),
  },

  props: {
    /**
     * Prop for texts form.
     */
    texts: {
      default: null,
      required: true,
      type: Object as PropType<TextType>,
    },
  },

  /**
   * Main setup method for componenent.
   * @returns Record<string, unknown>
   */
  setup(): Record<string, unknown> {
    /**
     * Computed property to get state of form machine.
     * @var {ComputedRef<string>}
     */
    const curretntStateFrom: ComputedRef<string> = computed(() => LoginFormStateMachine
      .getCurrentState());

    /**
     * @var {LoginFormParamsType}
     */
    const model: LoginFormParamsType = reactive({
      email: '',
      password: '',
    });

    /**
     * @var {ErrorMessageType}
     */
    const errorMessages: ErrorMessageType = reactive({
      email: null,
      password: null,
    });

    /**
     * Function to handle submit form.
     * @return {Promise<void>}
     */
    async function handleSubmitForm(): Promise<void> {
      const ValidationService = (await import('@/services/validationService')).default;
      const {
        isEmailValidation,
        isRequiredValidation,
        isPasswordValidation,
      } = await import('@/services/rulesValidationService');

      errorMessages.email = ValidationService.isValid(
        model.email,
        [isRequiredValidation(), isEmailValidation()],
      );
      errorMessages.password = ValidationService.isValid(
        model.password,
        [isRequiredValidation(), isPasswordValidation()],
      );

      if (!errorMessages.email && !errorMessages.password) {
        await LoginFormStateMachine.setState('pending', model);
      }
    }

    return {
      model,
      errorMessages,
      handleSubmitForm,
      curretntStateFrom,
    };
  },
});
