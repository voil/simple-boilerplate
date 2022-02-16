<template>
  <div :class="`NotificationMessageAtom NotificationMessageAtom--${notificationType}`">
    <component class="NotificationMessageAtom__icon" :is="iconInstance" />
    <div class="NotificationMessageAtom__content">
      <h3 v-if="notificationTitle"
        class="NotificationMessageAtom__title">
        {{ notificationTitle }}
      </h3>
      <p v-if="notificationDescription"
        class="NotificationMessageAtom__description">
        {{ notificationDescription }}
      </p>
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
