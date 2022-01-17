<template>
  <div :class="['DividerAtom', {
    'DividerAtom--color': color,
  }]">
    <slot v-if="Object.keys($slots).length > 0 && dividerType === 'horizontal'"/>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
