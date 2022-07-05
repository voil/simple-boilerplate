<template>
  <div class="PanelTemplate">
    <div class="PanelTemplate__header">
      <LogoAtom class="PanelTemplate__logo"
        image="/assets/images/logo.png" />
      <div class="PanelTemplate__user">
        <UserLoggedOrganism :menuOptions="{
            profile: {
              icon: 'edit',
              label: 'Profile user'
            },
            logout: {
              label: 'Logout',
              icon: 'lock'
            }
          }"/>
      </div>
    </div>
    <div class="PanelTemplate__menu">
      <MenuMolecule
        :active-key="currentActiveMenuElement"
        :options="{
          dashboard: {
            icon: 'edit',
            label: 'Dashboard'
          },
          projects: {
            icon: 'edit',
            label: 'Projects'
          },
          teams: {
            icon: 'edit',
            label: 'Teams'
          },
          users: {
            icon: 'edit',
            label: 'Users'
          },
          profiles: {
            icon: 'edit',
            label: 'Profiles'
          },
        }"
      @handleClickElementMenu="handleClickElementMenu"
      typeMenu="vertical"/>
    </div>
    <div class="PanelTemplate__content">
      <slot />
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
