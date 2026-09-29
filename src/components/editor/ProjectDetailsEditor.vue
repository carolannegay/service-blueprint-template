<script setup lang="ts">
import type { BlueprintProject } from '../../types/blueprint'

const props = defineProps<{
  project: BlueprintProject
}>()

const emit = defineEmits<{
  (event: 'update-project', value: BlueprintProject): void
}>()

const updateField = <K extends keyof BlueprintProject>(field: K, value: BlueprintProject[K]) => {
  emit('update-project', {
    ...props.project,
    [field]: value,
  })
}
</script>

<template>
  <section class="editor-panel-section">
    <h3>Project details</h3>
    <div class="detail-grid">
      <label>
        Project title
        <input :value="project.title" @input="updateField('title', ($event.target as HTMLInputElement).value)" />
      </label>
      <label>
        Subtitle
        <input :value="project.subtitle" @input="updateField('subtitle', ($event.target as HTMLInputElement).value)" />
      </label>
      <label>
        Client
        <input :value="project.client" @input="updateField('client', ($event.target as HTMLInputElement).value)" />
      </label>
      <label>
        Date
        <input :value="project.date" @input="updateField('date', ($event.target as HTMLInputElement).value)" />
      </label>
      <label>
        Owner
        <input :value="project.owner" @input="updateField('owner', ($event.target as HTMLInputElement).value)" />
      </label>
    </div>
  </section>
</template>
