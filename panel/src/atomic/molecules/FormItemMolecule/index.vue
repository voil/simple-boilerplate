<template>
  <div class="FormItemMolecule">
    <label v-if="label"
      :class="['FormItemMolecule__label', {
        'FormItemMolecule__label--error': errorMessage
      }]"
      data-testid="formItemMoleculeInstance">
      {{ label }}
    </label>
    <slot />
    <div v-if="errorMessage"
      class="FormItemMolecule__error"
      data-testid="formItemErrorMoleculeInstance">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
