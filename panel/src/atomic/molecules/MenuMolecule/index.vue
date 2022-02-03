<template>
  <div class="MenuMolecule">
    <ul :class="`MenuMolecule__list MenuMolecule__list--${typeMenu}`"
      data-testid="menuMoleculeListInstance">
      <li :key="option"
        data-testid="menuMoleculeItemInstance"
        :class="[`MenuMolecule__item MenuMolecule__item--${typeMenu}`, {
          'MenuMolecule__item--empty': !options[option].icon,
          'MenuMolecule__item--active': activeKey === option
        }]"
        v-for="option in Object.keys(options)"
        @click="$emit('handleClickElementMenu', option)"
      >
        <IconAtom v-if="options[option].icon"
          class="MenuMolecule__icon"
          data-testid="menuMoleculeIconInstance"
          :name="options[option].icon" />
        {{ options[option].label }}  
      </li>
    </ul>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
