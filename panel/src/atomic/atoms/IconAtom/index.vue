<template>
  <div
    :class="{
      IconAtom: true,
      'IconAtom--default': !color,
    }"
    data-testid="iconAtomInstance"
    :style="{ '--color-fill': color }"
  >
    <component :is="iconInstance" />
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
