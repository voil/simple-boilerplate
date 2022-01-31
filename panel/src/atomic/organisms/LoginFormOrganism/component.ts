import {
  ref,
  Ref,
  PropType,
  defineComponent,
  defineAsyncComponent,
} from 'vue';

type PropsInputType = {
  label: string,
  placeholder: string,
};

type AlertType = {
  title: string,
  description: string,
}

type AlertsType = {
  error: AlertType,
  success: AlertType,
};

type TextType = {
  email: PropsInputType,
  password: PropsInputType,
  button: string,
  spinnerMessage: string,
  alerts: AlertsType,
};

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  texts: TextType;
}


/**
 * Form item
 * Component molecule form item.
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
      type: Object as PropType<TextType>
    },
  },


  /**
   * Main setup method for componenent.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
   setup(props: Readonly<PropsComponentType>, { emit }): Record<string, unknown> {
     /**
      * @var {Ref<boolean>}
      */
    const isSpinnerVisible: Ref<boolean> = ref<boolean>(false);

    /**
     * @var {Ref<string>}
     */
    const typeResult: Ref<string> = ref<string>('success');

    return {
      typeResult,
      isSpinnerVisible,
    };
  },
});
