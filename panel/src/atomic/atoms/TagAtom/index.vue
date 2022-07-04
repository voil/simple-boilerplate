<template>
  <div :class="`
    TagAtom
    TagAtom--${tagType}
  `"
  data-testid="tagAtomInstance">
    <slot />
  </div>
</template>
<script src="./component.ts" lang="ts"/>
<style src="./style.sass" lang="sass"></style>
