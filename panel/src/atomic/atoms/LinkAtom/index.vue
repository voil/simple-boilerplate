<template>
  <a :class="`LinkAtom LinkAtom--${linkType}`"
    data-testid="linkAtomInstance">
    <slot />
  </a>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
