<template>
  <div :class="`NotificationMessageAtom NotificationMessageAtom--${notificationType}`"
    data-testid="notificationMessageAtomInstance">
    <component class="NotificationMessageAtom__icon" :is="iconInstance" />
    <div class="NotificationMessageAtom__content">
      <h3 v-if="notificationTitle"
        class="NotificationMessageAtom__title"
        data-testid="notificationMessageTitleAtomInstance">
        {{ notificationTitle }}
      </h3>
      <p v-if="notificationDescription"
        class="NotificationMessageAtom__description"
        data-testid="notificationMessageDescriptionAtomInstance">
        {{ notificationDescription }}
      </p>
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
