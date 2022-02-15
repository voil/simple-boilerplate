<template>
  <div class="PaginationListAtom">
    <div :class="['PaginationListAtom__button', {
      'PaginationListAtom__button--disabled': currentPage === 1
    }]"
      @click="currentPage === 1 ? null : handleChangePage(currentPage - 1)"
    >
      <svg class="PaginationListAtom__icon PaginationListAtom__icon--left"
        x="0px" y="0px"
        viewBox="0 0 330 330" xml:space="preserve">
        <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,
          0.001l-139.39,139.393L25.607,79.393
          c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,
          150c2.813,2.813,6.628,4.393,10.606,4.393
          s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
          <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
          <g></g><g></g><g></g>
      </svg>
    </div>
    <div :key="`page_${page}`"
      :data-testid="`PaginationListAtomInstance__${page}`"
      v-for="page in Array.from({ length: countOfPages }, (_, i) => i + 1).slice(
        currentPage - 2 <= 1 ? 0 : (currentPage + 2 >= countOfPages
          ? (countOfPages - 2) - 3 : currentPage - 3),
        currentPage - 2 <= 1 ? 5 : currentPage + 2)"
      :class="['PaginationListAtom__button', {
        'PaginationListAtom__button--active': currentPage === page
      }]"
      @click="currentPage === page ? null : handleChangePage(page)"
    >
      {{ page }}
    </div>
    <div v-if="pageSize * 5 < totalCount && (currentPage + 2 < countOfPages)"
      class="PaginationListAtom__button PaginationListAtom__button--default">
        ...
    </div>
    <div v-if="pageSize * 5 < totalCount && (currentPage + 2 < countOfPages)"
      class="PaginationListAtom__button">
      {{ countOfPages }}
    </div>
    <div :class="['PaginationListAtom__button', {
      'PaginationListAtom__button--disabled': currentPage === countOfPages
    }]"
      @click="currentPage === countOfPages ? null : handleChangePage(currentPage + 1)">
      <svg class="PaginationListAtom__icon PaginationListAtom__icon--right"
        x="0px" y="0px"
        viewBox="0 0 330 330" xml:space="preserve">
        <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,
          0.001l-139.39,139.393L25.607,79.393
          c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,
          150c2.813,2.813,6.628,4.393,10.606,4.393
          s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
          <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
          <g></g><g></g><g></g>
      </svg>
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
