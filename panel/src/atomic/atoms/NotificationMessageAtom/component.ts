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
  notificationType: string;
}


/**
 * NotificationMessageAtom
 * Component atom notification message.
 */
export default defineComponent({
  name: 'NotificationMessageAtom',

  props: {
    /**
     * Prop for type of notification.
     * @values error, success.
     */
    notificationType: {
      type: String,
      default: 'success',
      validator(prop: string): boolean {
        return [
          'error',
          'success',
        ].includes(prop as string);
      },
    },

    /**
     * Prop for title notification.
     */
    notificationTitle: {
      type: String,
      default: null,
    },

    /**
     * Prop for description notification.
     */
    notificationDescription: {
      type: String,
      default: null,
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
      const component = (await import(`@/assets/icons/${props.notificationType}.vue`)).default;
      iconInstance.value = component;
    }

    /**
     * Function fired before componenent mounted.
     */
    onBeforeMount(() => setIconInstance());

    /**
     * Watch props notificationType is change.
     */
    watch(() => props.notificationType, () => setIconInstance());

    return {
      iconInstance,
    };
  },
});
