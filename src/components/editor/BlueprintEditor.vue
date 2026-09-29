<script setup lang="ts">
import type { BlueprintColumn, BlueprintProject } from '../../types/blueprint'
import ColumnEditor from './ColumnEditor.vue'
import ProjectDetailsEditor from './ProjectDetailsEditor.vue'

const props = defineProps<{
  project: BlueprintProject
}>()

const emit = defineEmits<{
  (event: 'update-project', value: BlueprintProject): void
  (event: 'add-column', phaseIndex: number): void
  (event: 'delete-column', phaseIndex: number, columnIndex: number): void
  (event: 'add-recommendation', phaseIndex: number, columnIndex: number): void
  (event: 'delete-recommendation', phaseIndex: number, columnIndex: number, recommendationIndex: number): void
  (event: 'save'): void
  (event: 'reset'): void
  (event: 'export'): void
  (event: 'import'): void
}>()

const updateProject = (updatedProject: BlueprintProject) => {
  emit('update-project', updatedProject)
}

const updatePhaseName = (phaseIndex: number, value: string) => {
  const phases = props.project.phases.map((phase, index) =>
    index === phaseIndex ? { ...phase, name: value } : phase,
  )

  emit('update-project', {
    ...props.project,
    phases,
  })
}

const updatePhaseMoment = (phaseIndex: number, field: 'title' | 'detail', value: string) => {
  const phases = props.project.phases.map((phase, index) =>
    index === phaseIndex
      ? { ...phase, moment: { title: phase.moment?.title ?? '', detail: phase.moment?.detail ?? '', [field]: value } }
      : phase,
  )

  emit('update-project', {
    ...props.project,
    phases,
  })
}

const updateColumn = (phaseIndex: number, columnIndex: number, value: BlueprintColumn) => {
  const phases = props.project.phases.map((phase, phaseCursor) => {
    if (phaseCursor !== phaseIndex) {
      return phase
    }

    return {
      ...phase,
      columns: phase.columns.map((column, columnCursor) =>
        columnCursor === columnIndex ? value : column,
      ),
    }
  })

  emit('update-project', {
    ...props.project,
    phases,
  })
}

const handleAddColumn = (phaseIndex: number) => emit('add-column', phaseIndex)
const handleDeleteColumn = (phaseIndex: number, columnIndex: number) => emit('delete-column', phaseIndex, columnIndex)
const handleAddRecommendation = (phaseIndex: number, columnIndex: number) => emit('add-recommendation', phaseIndex, columnIndex)
const handleDeleteRecommendation = (phaseIndex: number, columnIndex: number, recommendationIndex: number) =>
  emit('delete-recommendation', phaseIndex, columnIndex, recommendationIndex)
</script>

<template>
  <section class="editor-shell">
    <ProjectDetailsEditor :project="project" @update-project="updateProject" />

    <div v-for="(phase, phaseIndex) in project.phases" :key="phase.id" class="phase-editor">
      <div class="phase-editor-header">
        <label>
          Phase name
          <input :value="phase.name" @input="updatePhaseName(phaseIndex, ($event.target as HTMLInputElement).value)" />
        </label>
        <button type="button" class="primary-button" @click="handleAddColumn(phaseIndex)">Add column</button>
      </div>

      <div class="phase-moment-editor">
        <label>
          Moment that matters
          <input
            :value="phase.moment?.title ?? ''"
            @input="updatePhaseMoment(phaseIndex, 'title', ($event.target as HTMLInputElement).value)"
          />
        </label>
        <label>
          Moment detail
          <textarea
            :value="phase.moment?.detail ?? ''"
            rows="2"
            @input="updatePhaseMoment(phaseIndex, 'detail', ($event.target as HTMLTextAreaElement).value)"
          />
        </label>
      </div>

      <div v-for="(column, columnIndex) in phase.columns" :key="column.id" class="column-editor-wrapper">
        <ColumnEditor
          :column="column"
          @update-column="updateColumn(phaseIndex, columnIndex, $event)"
          @add-recommendation="handleAddRecommendation(phaseIndex, columnIndex)"
          @delete-recommendation="handleDeleteRecommendation(phaseIndex, columnIndex, $event)"
          @delete-column="handleDeleteColumn(phaseIndex, columnIndex)"
        />
      </div>
    </div>

    <div class="editor-actions">
      <button type="button" class="primary-button" @click="emit('save')">Save changes</button>
      <button type="button" class="secondary-button" @click="emit('reset')">Reset to sample data</button>
      <button type="button" class="secondary-button" @click="emit('export')">Export blueprint JSON</button>
      <button type="button" class="secondary-button" @click="emit('import')">Import blueprint JSON</button>
    </div>
  </section>
</template>
