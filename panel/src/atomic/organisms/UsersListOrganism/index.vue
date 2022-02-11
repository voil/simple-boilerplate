<template>
  <div class="UsersListOrganism">
    <SpinnerAtom :is-visible="curretntStateList === 'pending'">
      <TableListMolecule :columns-table="columnsTable"
        :data-table="usersListFromStore.records"
        @handleSortList="handleSortList"/>
      <div class="UsersListOrganism__pagination">
        <PageListSizerAtom @handleChangeSizeList="handleChangeLimitOffsetList" />
        <PaginationListAtom :current-page="offset.page"
          :page-size="offset.limit"
          :total-count="usersListFromStore.total"
          @handleChangePage="handleChangePage"/>
      </div>
    </SpinnerAtom>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
