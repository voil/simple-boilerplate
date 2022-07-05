<template>
  <div class="BooleanElementWrapperAtom">
    <svg v-if="paramsColumn.slot"
      class="BooleanElementWrapperAtom__icon BooleanElementWrapperAtom__icon--checked"
      viewBox="0 0 128 128">
      <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,
        58-58A58.07,58.07,0,0,1,64,122Z" />
      <path d="M87.9,42.36,50.42,79.22,40.17,68.43a3,3,0,0,0-4.35,4.13l12.35,13a3
        ,3,0,0,0,2.12.93h.05a3,3,0,0,0,2.1-.86l39.65-39a3,3,0,1,0-4.21-4.28Z" />
    </svg>
    <svg v-if="!paramsColumn.slot"
      class="BooleanElementWrapperAtom__icon BooleanElementWrapperAtom__icon--unchecked"
      viewBox="0 0 128 128">
      <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,
        122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
      <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,
        35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,
        24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
    </svg>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
