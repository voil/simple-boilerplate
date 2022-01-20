<template>
  <div class="SpinnerAtom">
    <span v-if="message && isVisible"
      class="SpinnerAtom__message"
      data-testid="spinnerMessageAtomInstance"
    >
      {{ message }}
    </span>
    <div v-if="isVisible"
      class="SpinnerAtom__spinner"
      data-testid="spinnerSpinnerAtomInstance"/>
    <div :class="['SpinnerAtom__content', {
      'SpinnerAtom__content--visible': isVisible
    }]"
      data-testid="spinnerContentAtomInstance">
      <div v-if="isVisible"
        class="SpinnerAtom__mask"
        data-testid="spinnerMaskAtomInstance"/>
      <slot />
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
