<template>
  <div class="LoginFormOrganism">
    <SpinnerAtom :is-visible="curretntStateFrom === 'pending'"
      :message="texts? texts.spinnerMessage : null">
      <div class="LoginFormOrganism__content">
        <AlertAtom v-if="curretntStateFrom === 'success' || curretntStateFrom === 'error'"
          :alertType="curretntStateFrom"
          :alertTitle="texts? texts.alerts[curretntStateFrom].title : null"
          :alertDescription="texts? texts.alerts[curretntStateFrom].description : null" />
        <FormItemMolecule v-if="curretntStateFrom !== 'success'"
          :label="texts? texts.email.label : null"
          :error-message="errorMessages.email">
          <InputAtom :placeholder="texts? texts.email.placeholder: null"
            v-model="model.email"
            :inputType="curretntStateFrom === 'pending' ? 'disabled' : 'default'" />
        </FormItemMolecule>
        <FormItemMolecule v-if="curretntStateFrom !== 'success'"
          :label="texts? texts.password.label : null"
          :error-message="errorMessages.email">
          <PasswordAtom :placeholder="texts? texts.password.placeholder: null"
            v-model="model.password"
            :inputType="curretntStateFrom === 'pending' ? 'disabled' : 'default'" />
        </FormItemMolecule>
        <ButtonAtom v-if="curretntStateFrom !== 'success'"
          :buttonType="curretntStateFrom === 'pending' ? 'disabled' : 'primary'"
          @click="handleSubmitForm">
          {{ texts? texts.button : null }}
        </ButtonAtom>
      </div>
    </SpinnerAtom>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
