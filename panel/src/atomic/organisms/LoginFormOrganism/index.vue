<template>
  <div class="LoginFormOrganism">
    <SpinnerAtom :is-visible="isSpinnerVisible"
      :message="texts? texts.spinnerMessage : null">
      <div class="LoginFormOrganism__content">
        <AlertAtom :alertTitle="texts? texts.alerts[typeResult].title : null"
          :alertDescription="texts? texts.alerts[typeResult].description : null"/>
        <FormItemMolecule :label="texts? texts.email.label : null">
          <InputAtom :placeholder="texts? texts.email.placeholder: null"/>
        </FormItemMolecule>
        <FormItemMolecule :label="texts? texts.password.label : null">
          <PasswordAtom :placeholder="texts? texts.password.placeholder: null"/>
        </FormItemMolecule>
        <ButtonAtom :buttonType="'primary'">
          {{ texts? texts.button : null }}
        </ButtonAtom>
      </div>
    </SpinnerAtom>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
