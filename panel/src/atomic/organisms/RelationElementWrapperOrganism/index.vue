<template>
  <div class="RelationElementWrapperOrganism">
    <TagAtom v-if="itemsRelation.length > 0" class="RelationElementWrapperOrganism__tag">
      {{ itemsRelation.length }}
    </TagAtom>
    <span v-if="itemsRelation.length === 0"> --- </span>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
