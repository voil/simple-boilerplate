<template>
  <div class="UserLoggedOrganism">
    <DropdownAtom>
      {{ userLogged? userLogged.name_and_surname : '---' }}
      <template #overlayer>
        <MenuMolecule :options="menuOptions"
          @handleClickElementMenu="handleClickElementMenu"
        />
      </template>
    </DropdownAtom>
    <PopoverConfirmMolecule
      v-if="isPopoverConfirmVisible"
      data-cy="popoverConfirmInstance"
      popover-title="Logout from platform"
      popover-description="Are you sure you want to log out of the panel?"
      @handleCancelAction="isPopoverConfirmVisible = false"
      @handleConfirmAction="handleConfirmAction"
    />
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
