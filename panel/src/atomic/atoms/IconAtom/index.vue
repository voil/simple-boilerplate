<template>
  <div
    :class="{
      IconAtom: true,
      'IconAtom--default': !color,
    }"
    data-testid="iconAtomInstance"
    v-html="iconInstance"
    :style="{ '--color-fill': color }"
  ></div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
