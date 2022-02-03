import {
  Ref,
  watch,
  shallowRef,
  onBeforeMount,
  defineComponent,
} from 'vue';

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  name: string;
  color: string;
};

/**
 * Icon
 * Component atom icon.
 *

 */
export default defineComponent({
  name: 'AtomIcon',

  props: {
    /**
     * Prop for name icon.
     * @type {String|Null}
     */
    name: {
      type: String,
      required: true,
      default: null,
    },

    /**
     * Color for icon.
     * @type {String|Null}
     */
    color: {
      type: String,
      default: null,
      validator(prop: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(prop);
      },
    },
  },

  /**
   * Main setup method for component.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
  setup(props: Readonly<PropsComponentType>) {
    const iconInstance: Ref<null | string> = shallowRef<null | string>(null);

    /**
     * Method to set icon instance.
     * @return {Promise<void>}
     */
    async function setIconInstance(): Promise<void> {
      const component = (await import(`@/assets/icons/${props.name}.vue`)).default;
      iconInstance.value = component;
    }

    /**
     * Function fired before componenent mounted.
     */
    onBeforeMount(() => setIconInstance());

    /**
     * Watch props name is change.
     */
    watch(() => props.name, () => setIconInstance());

    return {
      iconInstance,
    };
  },
});
