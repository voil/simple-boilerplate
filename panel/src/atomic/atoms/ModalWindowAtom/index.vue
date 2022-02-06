<template>
  <teleport to="body">
    <div class="ModalWindowAtom" data-cy="modalWindowInstance">
      <div class="ModalWindowAtom__mask" />
      <div class="ModalWindowAtom__window"
        :style="{ '--window-width': `${windowWidth}px` }">
        <div v-if="modalTitle || modalDescription"
          class="ModalWindowAtom__header"
          data-testid="modalWindowAtomHeaderInstance">
          <h3 v-if="modalTitle"
            class="ModalWindowAtom__title"
            data-testid="modalWindowAtomTitleInstance">
            {{ modalTitle }}
          </h3>
          <p v-if="modalDescription"
            class="ModalWindowAtom__description"
            data-testid="modalWindowAtomDescriptionInstance">
            {{ modalDescription }}
          </p>
        </div>
        <div class="ModalWindowAtom__content">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
