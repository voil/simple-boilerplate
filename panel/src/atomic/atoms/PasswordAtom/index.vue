<template>
  <div :class="`
    PasswordAtom
    PasswordAtom--${inputType}
  `"
  data-testid="inputAtomInstance"
  >
    <input
      :type="typeInput"
      @input="handleInput"
      :value="modelValue"
      class="PasswordAtom__input"
      :placeholder="placeholder"
      :disabled="inputType === 'disabled'"
      data-testid="inputInputAtomInstance"
    />
    <div class="PasswordAtom__eye"
      @click="tooglePasswordVisibility"
      data-testid="inputEyeAtomInstance"
    >
      <component :is="iconInstance" />
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts"/>
<style src="./style.sass" lang="sass"></style>
