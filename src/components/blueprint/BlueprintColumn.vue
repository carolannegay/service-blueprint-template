<script setup lang="ts">
import { computed } from 'vue'
import type { BlueprintColumn } from '../../types/blueprint'

const props = defineProps<{
  column: BlueprintColumn
}>()

const sections = computed(() => [
  {
    key: 'action',
    label: 'User Actions',
    value: props.column.action.label,
    variant: props.column.action.type,
  },
  {
    key: 'touchpoints',
    label: 'Touchpoints',
    value: props.column.touchpoints.map((item) => item.label),
    variant: 'default',
  },
  {
    key: 'opportunities',
    label: 'Opportunities',
    value: props.column.opportunities.map((item) => item.label),
    variant: 'default',
  },
  {
    key: 'businessProcesses',
    label: 'Business Processes',
    value: props.column.businessProcesses.map((item) => item.label),
    variant: 'default',
  },
  {
    key: 'technicalProcesses',
    label: 'Technical Processes',
    value: props.column.technicalProcesses.map((item) => item.label),
    variant: 'default',
  },
  {
    key: 'recommendations',
    label: 'Recommendations',
    value: props.column.recommendations.map((item) => item.label),
    variant: 'default',
  },
])
</script>

<template>
  <div class="blueprint-column">
    <div class="column-header">{{ column.name }}</div>
    <div v-for="section in sections" :key="section.key" class="column-section" :class="`column-section--${section.variant}`">
      <div class="column-section-label">{{ section.label }}</div>
      <div class="column-section-body">
        <template v-if="Array.isArray(section.value)">
          <ul class="column-list">
            <li v-for="item in section.value" :key="item">{{ item }}</li>
          </ul>
        </template>
        <template v-else>
          {{ section.value }}
        </template>
      </div>
    </div>
  </div>
</template>
