<template>
  <div class="AuthenticationTemplate">
    <div class="AuthenticationTemplate__content">
      <LogoAtom image="/assets/images/logo.png"
        class="AuthenticationTemplate__logo"/>
      <CardAtom
        :cardTitle="title"
        :cardDescription="description"
      >
        <slot />
      </CardAtom>
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
