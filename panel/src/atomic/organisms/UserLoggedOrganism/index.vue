<template>
  <div class="UserLoggedOrganism">
    <DropdownAtom>
      {{ user? user.name_and_surname : '---' }}
      <template #overlayer>
        dsf
      </template>
    </DropdownAtom>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
