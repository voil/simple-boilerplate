<template>
  <div class="TeamsListOrganism">
    <SpinnerAtom :is-visible="curretntStateList === 'pending'">
      <TableListMolecule :columns-table="columnsTable"
        :data-table="teamsListFromStore.records"
        @handleSortList="handleSortList"
        @handleDeleteElements="handleDeleteElements"/>
      <div class="TeamsListOrganism__pagination">
        <PageListSizerAtom v-if="teamsListFromStore.total > 10"
          @handleChangeSizeList="handleChangeLimitOffsetList" />
        <PaginationListAtom v-if="teamsListFromStore.total > offset.limit"
          :current-page="offset.page"
          :page-size="offset.limit"
          :total-count="teamsListFromStore.total"
          @handleChangePage="handleChangePage"/>
      </div>
    </SpinnerAtom>
    <PopoverConfirmMolecule
      v-if="isPopoverConfirmVisible"
      data-cy="popoverConfirmTeamsListInstance"
      popover-title="Delete records from list"
      popover-description="Are you sure you want to delete current records?"
      @handleCancelAction="isPopoverConfirmVisible = false"
      @handleConfirmAction="handleConfirmDeleteAction"
    />
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
