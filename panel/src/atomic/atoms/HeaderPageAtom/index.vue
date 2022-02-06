<template>
  <div v-if="headerTitle || headerDescription"
    class="HeaderPageAtom"
    data-testid="headerPageAtomInstance"
  >
    <h3 v-if="headerTitle"
      class="HeaderPageAtom__title"
      data-testid="headerPageAtomTitleInstance"
    >{{ headerTitle }}</h3>
    <p v-if="headerDescription"
      class="HeaderPageAtom__description"
      data-testid="headerPageDescriptionInstance"
    >{{ headerDescription }}</p>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
