<template>
  <button data-testid="buttonAtomInstance"
    :disabled="buttonType === 'disabled'"
    :class="`ButtonAtom ButtonAtom--${buttonType}`"
  >
    <div  v-if="$slots.icon"
      :class="`ButtonAtom__icon ButtonAtom__icon--${buttonType}`">
      <slot name="icon" />
    </div>
    <slot />
  </button>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
