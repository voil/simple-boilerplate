<template>
  <div v-if="image"
    class="LogoAtom"
    data-testid="logoAtomInstance">
    <img :src="image" class="LogoAtom__image"/>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
