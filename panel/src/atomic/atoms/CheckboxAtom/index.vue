<template>
  <div class="CheckboxAtom">
    <input
      type="checkbox"
      @input="handleInput"
      :checked="modelValue"
      :class="`
        CheckboxAtom__input
        CheckboxAtom__input--${inputType}
      `"
      :disabled="inputType === 'disabled'"
      data-testid="checkboxAtomInstance"
    />
    <span :class="`
        CheckboxAtom__marker
        CheckboxAtom__marker--${inputType}
      `"
      data-testid="checkboxMarkerAtomInstance" />
  </div>
</template>
<script src="./component.ts" lang="ts"/>
<style src="./style.sass" lang="sass"></style>
