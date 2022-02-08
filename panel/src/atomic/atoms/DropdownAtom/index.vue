<template>
  <div class="DropdownAtom">
    <div class="DropdownAtom__slot"
      @blur="hideOnClick ? handleHideDropdown : null"
      @click="isOverlayerVisible = !isOverlayerVisible"
      data-testid="dropdownAtomInstance"
      data-cy="dropdownAtomInstance"
      tabindex="0">
      <slot/>
    </div>
    <svg :class="['DropdownAtom__icon', {
      'DropdownAtom__icon--rotate': !isOverlayerVisible
    }]"
      data-testid="dropdownAtomIconInstance" x="0px" y="0px"
      viewBox="0 0 330 330" xml:space="preserve">
      <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,
        0.001l-139.39,139.393L25.607,79.393
        c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,
        150c2.813,2.813,6.628,4.393,10.606,4.393
        s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
        <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
        <g></g><g></g><g></g>
    </svg>
    <div
      v-if="isOverlayerVisible"
      data-cy="dropdownOverlayerInstance"
      :class="[`DropdownAtom__overlayer DropdownAtom__overlayer--${positionOverlayer}`, {
        'DropdownAtom__overlayer--visible': isOverlayerVisible
      }]"
      data-testid="dropdownAtomOverlayerInstance">
      <slot name="overlayer" />
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts"/>
<style src="./style.sass" lang="sass"></style>
