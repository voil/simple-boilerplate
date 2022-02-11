<template>
  <div :class="['TextElementWrapperAtom', {
    'TextElementWrapperAtom--tooltip': paramsColumn.slot.trim().length > breakpointText
  }]">
    {{ paramsColumn.slot.trim().length > breakpointText
      ? `${paramsColumn.slot.trim().slice(0, breakpointText)}...` : paramsColumn.slot.trim() }}
         <slot />
    <div v-if="paramsColumn.slot.trim().length > breakpointText"
      class="TextElementWrapperAtom__tooltip">
      <i class="TextElementWrapperAtom__triangle"/>
      {{ paramsColumn.slot.trim() }}
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
