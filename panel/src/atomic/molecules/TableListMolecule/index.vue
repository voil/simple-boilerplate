<template>
  <div class="TableListMolecule">
    <div class="TableListMolecule__selected">
      Number of selected rows: {{ selectedRows.length }}
      <DividerAtom divider-type="vertical" />
      <LinkAtom
        @click="selectedRows.length === 0 ? null : $emit('handleDeleteElements', selectedRows)"
        :link-type="selectedRows.length === 0 ? 'disabled' : 'error'">
        delete selected rows
      </LinkAtom>
    </div>
    <div class="TableListMolecule__wrapper">
      <div class="TableListMolecule__settings">
        <div class="TableListMolecule__settingsHeader">
          <DropdownAtom position-overlayer="right"
            :hide-on-click="false">
            <IconAtom class="TableListMolecule__settingsIcon" name="cogs" />
            <template #overlayer>
              <div
                :key="`visible__${column}`"
                class="TableListMolecule__columnsVisiblity"
                v-for="column in Object.keys(parsedColumnsTable)">
                <CheckboxAtom v-model="parsedColumnsTable[column].isVisible"
                  :input-type="Object.keys(parsedColumnsTable)
                    .filter(inner => parsedColumnsTable[inner].isVisible).length <= 3
                  && parsedColumnsTable[column].isVisible
                    ? 'disabled' : 'default'"/>
                {{ parsedColumnsTable[column].label }}
              </div>
            </template>
          </DropdownAtom>
        </div>
        <div :key="`dataSettings_${index}`"
          class="TableListMolecule__settingsItem"
          v-for="(row, index) in dataTable">
          <CheckboxAtom v-if="row.canDelete"
            @handleChangeValue="(value) => handleAssignRowToDelete(value, row.uuid)"/>
        </div>
      </div>
      <div class="TableListMolecule__content">
        <div class="TableListMolecule__header">
          <div
            :key="column"
            :class="['TableListMolecule__headerItem', {
              'TableListMolecule__headerItem--visible': parsedColumnsTable[column].isVisible,
              'TableListMolecule__headerItem--sorting': parsedColumnsTable[column].canSorting,
              'TableListMolecule__headerItem--sorted' : parsedColumnsTable[column]
                .canSorting === 'asc'
                || parsedColumnsTable[column].canSorting === 'desc'
            }]"
            :style="{ '--width-column' : parsedColumnsTable[column].width
              ? `${parsedColumnsTable[column].width}px` : '200px' }"
              @click="parsedColumnsTable[column].canSorting ? handleSortColumn(column) : null"
            v-for="column in Object.keys(parsedColumnsTable)">
            {{ parsedColumnsTable[column].label }}
            <IconAtom v-if="parsedColumnsTable[column].canSorting === 'asc'
              || parsedColumnsTable[column].canSorting === 'desc'"
              class="TableListMolecule__headerIcon"
              :name="parsedColumnsTable[column].canSorting === 'asc' ? 'arrow-up' : 'arrow-down'" />
          </div>
        </div>
        <div :key="`data_${index}`"
          class="TableListMolecule__data"
          v-for="(row, index) in dataTable">
          <div :key="`column_${column}`"
            :class="['TableListMolecule__dataItem', {
              'TableListMolecule__dataItem--visible': parsedColumnsTable[column].isVisible
            }]"
            :style="{ '--width-row' : parsedColumnsTable[column].width
              ? `${parsedColumnsTable[column].width}px` : '200px' }"
            v-for="column in Object.keys(parsedColumnsTable)">
            <component :is="handleTypeOfColumn(parsedColumnsTable[column].type)" :params-column="{
              slot: row[column]
            }" />
          </div>
        </div>
      </div>
      <div class="TableListMolecule__actions">
        <div class="TableListMolecule__actionsHeader">
          Actions
        </div>
        <div :key="`dataAction_${index}`"
          class="TableListMolecule__actionsItem"
          v-for="(row, index) in dataTable">
          <div class="TableListMolecule__action TableListMolecule__action--update">
            <IconAtom class="TableListMolecule__actionIcon" name="edit" />
          </div>
          <div v-if="row.canDelete"
            @click="$emit('handleDeleteElements', [row.uuid])"
            class="TableListMolecule__action TableListMolecule__action--delete">
            <IconAtom class="TableListMolecule__actionIcon" name="delete" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./component.ts" lang="ts" />
<style src="./style.sass" lang="sass"></style>
