<template>
  <div class="PageListSizer">
    <div v-for="size in optionsSizer"
      :key="`size_${size}`"
      :data-testid="`pageListSizeItemInstance__${size}`"
      @click="handleChangeListSize(size)"
      :class="['PageListSizer__item', {
        'PageListSizer__item--active': currentSize === size
      }]">
        {{ size }}
      </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
