<template>
  <div :class="`
      InputAtom
      InputAtom--${inputType}
    `"
    data-testid="inputAtomInstance"
  >
    <input
      type="text"
      @input="handleInput"
      :value="modelValue"
      class="InputAtom__input"
      :placeholder="placeholder"
      :disabled="inputType === 'disabled'"
      data-testid="inputInputAtomInstance"
    />
  </div>
</template>
<script src="./component.ts" lang="ts"/>
<style src="./style.sass" lang="sass"></style>
