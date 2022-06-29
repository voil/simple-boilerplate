import {
  createApp,
  ComponentPublicInstance,
} from 'vue';

/**
 * @type {PropsType}
 */
type PropsType = {
  title: string;
  description: string;
};

/**
 * @interface {NotificationServiceInterface}
 */
interface NotificationServiceInterface {
  success: (props: PropsType) => Promise<void>;
  error: (props: PropsType) => Promise<void>;
}

/**
 * NotificationService
 * Notification service to show notifications.
 */
class NotificationService implements NotificationServiceInterface {
  /**
   * Method to open success notification.
   * @param {PropsType} props
   */
  public async success(props: PropsType): Promise<void> {
    this.#removeOldInstance();
    this.#showNotification(
      await this.#createInstance('success', props),
    );
  }

  /**
   * Method to open error notification.
   * @param {PropsType} props
   */
  public async error(props: PropsType): Promise<void> {
    this.#removeOldInstance();
    this.#showNotification(
      await this.#createInstance('error', props),
    );
  }

  /**
   * Method to show notification.
   * @param {ComponentPublicInstance} instance
   */
  #showNotification(instance: ComponentPublicInstance): void {
    const wrapper = this.#createWrapper();

    wrapper.appendChild(instance.$el);
    document.body.appendChild(wrapper);
  }

  /**
   * Method to create instance.
   * @param {String} type
   * @param {PropsType} props
   * @returns {Promise<ComponentPublicInstance>}
   */
  async #createInstance(type: string, props: PropsType): Promise<ComponentPublicInstance> {
    const container = document.createElement('div');
    const component = (await import('@/atomic/atoms/NotificationMessageAtom/index.vue')).default;

    return createApp(component, {
      notificationType: type,
      notificationTitle: props.title,
      notificationDescription: props.description,
    }).mount(container);
  }

  /**
   * Method to remove old instance wrapper.
   */
  #removeOldInstance(): void {
    const instanceWrapper = document.querySelector('#wrapperNotification');
    if (instanceWrapper) {
      instanceWrapper.remove();
    }
  }

  /**
   * Method to create wrapper instance.
   * @returns {HTMLElement}
   */
  #createWrapper(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.id = 'wrapperNotification';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '20px';
    wrapper.style.right = '20px';

    return wrapper;
  }
}

export default new NotificationService();
