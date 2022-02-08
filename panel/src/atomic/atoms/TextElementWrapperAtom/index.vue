<template>
  <div :class="['TextElementWrapperAtom', {
    'TextElementWrapperAtom--tooltip': textFromSlot.length > breakpointText
  }]">
    {{ textFromSlot.length > breakpointText ? `${textFromSlot.slice(0, breakpointText)}...` : textFromSlot }}
    <div v-if="textFromSlot.length > breakpointText"
      class="TextElementWrapperAtom__tooltip">
      <i class="TextElementWrapperAtom__triangle"/>
      {{ textFromSlot }}
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
