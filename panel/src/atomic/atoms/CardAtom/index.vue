<template>
  <div :class="`CardAtom CardAtom--${cardType}`"
    data-testid="cardAtomInstance">
    <div v-if="cardTitle || cardDescription"
      class="CardAtom__header"
      data-testid="cardAtomHeaderInstance"
    >
      <h3 v-if="cardTitle"
        class="CardAtom__title"
        data-testid="cardAtomTitleInstance"
      >{{ cardTitle }}</h3>
      <p v-if="cardDescription"
        class="CardAtom__description"
        data-testid="cardAtomDescriptionInstance"
      >{{ cardDescription }}</p>
    </div>
    <div class="CardAtom__content">
      <slot />
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
