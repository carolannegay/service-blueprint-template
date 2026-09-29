<script setup lang="ts">
import type { BlueprintProject } from '../../types/blueprint'

defineProps<{
  project: BlueprintProject
  isEditMode: boolean
}>()

const emit = defineEmits<{
  (event: 'toggle-edit'): void
  (event: 'reset'): void
  (event: 'export'): void
  (event: 'import'): void
}>()
</script>

<template>
  <header class="blueprint-header">
    <div class="header-top-row">
      <div>
        <p class="header-kicker">Service blueprint</p>
        <h1>{{ project.title }}</h1>
        <p class="header-subtitle">{{ project.subtitle }}</p>
      </div>

      <div class="header-actions">
        <button type="button" class="primary-button" @click="emit('toggle-edit')">
          {{ isEditMode ? 'View blueprint' : 'Edit blueprint' }}
        </button>
        <button type="button" class="secondary-button" @click="emit('reset')">Reset</button>
        <button type="button" class="secondary-button" @click="emit('export')">Export JSON</button>
        <button type="button" class="secondary-button" @click="emit('import')">Import JSON</button>
      </div>
    </div>

    <div class="meta-row">
      <span><strong>Client:</strong> {{ project.client }}</span>
      <span><strong>Date:</strong> {{ project.date }}</span>
      <span><strong>Owner:</strong> {{ project.owner }}</span>
    </div>
  </header>
</template>
