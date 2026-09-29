<script setup lang="ts">
import type { ActionType, BlueprintColumn } from '../../types/blueprint'

const props = defineProps<{
  column: BlueprintColumn
}>()

const emit = defineEmits<{
  (event: 'update-column', value: BlueprintColumn): void
  (event: 'add-recommendation'): void
  (event: 'delete-recommendation', recommendationIndex: number): void
  (event: 'delete-column'): void
}>()

const updateColumnName = (value: string) => {
  emit('update-column', { ...props.column, name: value })
}

const updateActionLabel = (value: string) => {
  emit('update-column', {
    ...props.column,
    action: { ...props.column.action, label: value },
  })
}

const updateActionType = (value: ActionType) => {
  emit('update-column', {
    ...props.column,
    action: { ...props.column.action, type: value },
  })
}

const updateListValue = (
  key: 'touchpoints' | 'opportunities' | 'businessProcesses' | 'technicalProcesses',
  index: number,
  value: string,
) => {
  const list = [...props.column[key]]
  list[index] = { ...list[index], label: value }
  emit('update-column', {
    ...props.column,
    [key]: list,
  } as BlueprintColumn)
}

const updateRecommendation = (index: number, value: string) => {
  const list = [...props.column.recommendations]
  list[index] = { ...list[index], label: value }
  emit('update-column', {
    ...props.column,
    recommendations: list,
  })
}
</script>

<template>
  <div class="column-editor">
    <div class="column-editor-header">
      <input :value="column.name" @input="updateColumnName(($event.target as HTMLInputElement).value)" />
      <button type="button" class="danger-button" @click="emit('delete-column')">Delete column</button>
    </div>

    <div class="editor-group">
      <label>
        User action
        <input :value="column.action.label" @input="updateActionLabel(($event.target as HTMLInputElement).value)" />
      </label>
      <label>
        Action type
        <select :value="column.action.type" @change="updateActionType(($event.target as HTMLSelectElement).value as ActionType)">
          <option value="neutral">Neutral</option>
          <option value="gain">Gain</option>
          <option value="pain">Pain</option>
        </select>
      </label>
    </div>

    <div class="editor-group">
      <h4>Touchpoints</h4>
      <div v-for="(item, index) in column.touchpoints" :key="item.id" class="list-editor-row">
        <input :value="item.label" @input="updateListValue('touchpoints', index, ($event.target as HTMLInputElement).value)" />
      </div>
    </div>

    <div class="editor-group">
      <h4>Opportunities</h4>
      <div v-for="(item, index) in column.opportunities" :key="item.id" class="list-editor-row">
        <input :value="item.label" @input="updateListValue('opportunities', index, ($event.target as HTMLInputElement).value)" />
      </div>
    </div>

    <div class="editor-group">
      <h4>Business processes</h4>
      <div v-for="(item, index) in column.businessProcesses" :key="item.id" class="list-editor-row">
        <input :value="item.label" @input="updateListValue('businessProcesses', index, ($event.target as HTMLInputElement).value)" />
      </div>
    </div>

    <div class="editor-group">
      <h4>Technical processes</h4>
      <div v-for="(item, index) in column.technicalProcesses" :key="item.id" class="list-editor-row">
        <input :value="item.label" @input="updateListValue('technicalProcesses', index, ($event.target as HTMLInputElement).value)" />
      </div>
    </div>

    <div class="editor-group">
      <h4>Recommendations</h4>
      <div v-for="(item, index) in column.recommendations" :key="item.id" class="list-editor-row">
        <input :value="item.label" @input="updateRecommendation(index, ($event.target as HTMLInputElement).value)" />
        <button type="button" class="danger-button" @click="emit('delete-recommendation', index)">Remove</button>
      </div>
      <button type="button" class="secondary-button" @click="emit('add-recommendation')">Add recommendation</button>
    </div>
  </div>
</template>
