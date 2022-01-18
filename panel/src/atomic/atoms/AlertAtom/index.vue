<template>
  <div
    v-if="alertTitle || alertDescription"
    :class="`AlertAtom AlertAtom--${alertType}`"
    data-testid="alertAtomInstance">
    <h3 v-if="alertTitle"
      class="AlertAtom__title"
      data-testid="alertTitleAtomInstance">
      {{ alertTitle }}
    </h3>
    <p v-if="alertDescription"
      class="AlertAtom__description"
      data-testid="alertDescriptionAtomInstance">
      {{ alertDescription }}
    </p>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
