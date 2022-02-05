<template>
  <div>
    <ModalWindowAtom
      :window-width="450"
      :modal-title="popoverTitle"
      :modal-description="popoverDescription">
      <div class="PopoverConfirmMolecule">
        <ButtonAtom button-type="default"
          @click="$emit('handleCancelAction')">
          Cancel
        </ButtonAtom>
        <ButtonAtom @click="$emit('handleConfirmAction')">
          Confirm
        </ButtonAtom>
      </div>
    </ModalWindowAtom>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
