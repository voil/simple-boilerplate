<template>
  <div class="PanelTemplate">
    <div class="PanelTemplate__header">
      <LogoAtom class="PanelTemplate__logo"
        image="/assets/images/logo.png" />
      <div class="PanelTemplate__user">
        <slot name="user" />
      </div>
    </div>
    <div class="PanelTemplate__menu">
      <slot name="menu" />
    </div>
    <div class="PanelTemplate__content">
      <slot />
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
