<template>
  <div class="SpinnerAtom">
    <span v-if="message"
      class="SpinnerAtom__message"
      data-testid="spinnerMessageAtomInstance"
    >
      {{ message }}
    </span>
    <div class="SpinnerAtom__spinner" />
    <div class="SpinnerAtom__content">
      <slot />
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
