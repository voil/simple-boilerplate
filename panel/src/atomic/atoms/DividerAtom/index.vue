<template>
  <div :class="['DividerAtom', {
    'DividerAtom--color': color,
    'DividerAtom--vertical': dividerType === 'vertical',
  }]"
  data-testid="dividerAtomInstance"
  :style="{ '--color-fill': color }">
    <div :class="['DividerAtom__line', {
      'DividerAtom__line--color': color,
      'DividerAtom__line--vertical': dividerType === 'vertical',
    }]"
      :style="{ '--color-fill': color }"
      data-testid="lineLeftAtomInstance"/>
    <div class="DividerAtom__content">
      <slot v-if="Object.keys($slots).length > 0 && dividerType === 'horizontal'"/>
    </div>
    <div v-if="dividerType === 'horizontal'"
      :class="['DividerAtom__line', {
        'DividerAtom__line--color': color
      }]"
      :style="{ '--color-fill': color }"
      data-testid="lineRightAtomInstance"/>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
