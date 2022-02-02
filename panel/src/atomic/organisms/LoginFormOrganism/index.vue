<template>
  <div class="LoginFormOrganism">
    <SpinnerAtom :is-visible="curretntStateFrom === 'pending'"
      :message="texts? texts.spinnerMessage : null">
      <div class="LoginFormOrganism__content">
        <AlertAtom v-if="curretntStateFrom === 'success' || curretntStateFrom === 'error'"
          :alertType="curretntStateFrom"
          :alertTitle="texts? texts.alerts[curretntStateFrom].title : null"
          :alertDescription="texts? texts.alerts[curretntStateFrom].description : null"
          data-cy="alertMessage" />
        <FormItemMolecule v-if="curretntStateFrom !== 'success'"
          :label="texts? texts.email.label : null"
          :error-message="errorMessages.email">
          <InputAtom :placeholder="texts? texts.email.placeholder: null"
            v-model="model.email"
            data-cy="emailInput"
            :inputType="curretntStateFrom === 'pending' ? 'disabled'
              : (errorMessages.email ? 'error' : 'default')" />
        </FormItemMolecule>
        <FormItemMolecule v-if="curretntStateFrom !== 'success'"
          :label="texts? texts.password.label : null"
          :error-message="errorMessages.password">
          <PasswordAtom :placeholder="texts? texts.password.placeholder: null"
            v-model="model.password"
            data-cy="passwordInput"
            :inputType="curretntStateFrom === 'pending' ? 'disabled'
              : (errorMessages.password ? 'error' : 'default')" />
        </FormItemMolecule>
        <ButtonAtom v-if="curretntStateFrom !== 'success'"
          data-cy="submitButton"
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
