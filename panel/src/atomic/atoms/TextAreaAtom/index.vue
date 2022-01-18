<template>
  <div :class="`
    TextareaAtom
    TextareaAtom--${inputType}
  `"
  data-testid="textareaAtomInstance"
  >
    <textarea
      @input="handleInput"
      :value="modelValue"
      class="TextareaAtom__input"
      :placeholder="placeholder"
      :disabled="inputType === 'disabled'"
      data-testid="textareaInputAtomInstance"
    />
  </div>
</template>
<script src="./component.ts" lang="ts"/>
<style src="./style.sass" lang="sass"></style>
