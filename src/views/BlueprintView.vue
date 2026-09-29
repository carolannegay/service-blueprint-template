<script setup lang="ts">
import { computed } from 'vue'
import BlueprintCanvas from '../components/blueprint/BlueprintCanvas.vue'
import BlueprintHeader from '../components/blueprint/BlueprintHeader.vue'
import BlueprintEditor from '../components/editor/BlueprintEditor.vue'
import { useBlueprint } from '../composables/useBlueprint'

const {
  project,
  isEditMode,
  persistProject,
  resetProject,
  exportProject,
  importProject,
  addColumn,
  deleteColumn,
  addRecommendation,
  deleteRecommendation,
} = useBlueprint()

const exportBlueprint = () => {
  const json = exportProject()
  const blob = new Blob([json], { type: 'application/json' })
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.download = 'blueprint-export.json'
  link.click()
  URL.revokeObjectURL(link.href)
}

const triggerImport = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'

  input.addEventListener('change', async (event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) {
      return
    }

    try {
      const text = await file.text()
      importProject(text)
    } catch {
      window.alert('The selected JSON file does not match the blueprint format.')
    }
  })

  input.click()
}

const updateProject = (nextProject: typeof project.value) => {
  persistProject(nextProject)
}

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}

const projectSummary = computed(() => project.value)
</script>

<template>
  <main class="blueprint-view">
    <BlueprintHeader
      :project="projectSummary"
      :is-edit-mode="isEditMode"
      @toggle-edit="toggleEditMode"
      @reset="resetProject"
      @export="exportBlueprint"
      @import="triggerImport"
    />

    <BlueprintEditor
      v-if="isEditMode"
      :project="projectSummary"
      @update-project="updateProject"
      @add-column="addColumn"
      @delete-column="deleteColumn"
      @add-recommendation="addRecommendation"
      @delete-recommendation="deleteRecommendation"
      @save="persistProject(projectSummary)"
      @reset="resetProject"
      @export="exportBlueprint"
      @import="triggerImport"
    />

    <BlueprintCanvas v-else :project="projectSummary" />
  </main>
</template>
