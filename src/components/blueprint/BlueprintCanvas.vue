<script setup lang="ts">
import { computed } from 'vue'
import type { BlueprintColumn, BlueprintProject } from '../../types/blueprint'
import BlueprintCell from './BlueprintCell.vue'
import BlueprintRowLabel from './BlueprintRowLabel.vue'

const props = defineProps<{
  project: BlueprintProject
}>()

const rowDefinitions = [
  { key: 'action', label: 'User Actions' },
  { key: 'moments', label: 'Moments that Matter' },
  { key: 'touchpoints', label: 'Touchpoints' },
  { key: 'opportunities', label: 'Opportunities' },
  { key: 'visibility', label: 'Line of Visibility' },
  { key: 'businessProcesses', label: 'Business Processes' },
  { key: 'technicalProcesses', label: 'Technical Processes' },
  { key: 'recommendations', label: 'Recommendations' },
]

const columns = computed(() => props.project.phases.flatMap((phase) => phase.columns))

const phaseHeaderOffsets = computed(() => {
  const offsets: Array<{ key: string; start: number }> = []
  let currentOffset = 2

  props.project.phases.forEach((phase) => {
    offsets.push({ key: phase.id, start: currentOffset })
    currentOffset += phase.columns.length
  })

  return offsets
})

const totalColumns = computed(() => columns.value.length)

const gridStyle = computed(() => ({
  gridTemplateColumns: `220px repeat(${totalColumns.value}, minmax(190px, 1fr))`,
}))

const phaseColumnStart = (phaseId: string) =>
  phaseHeaderOffsets.value.find((entry) => entry.key === phaseId)?.start ?? 2

const getCellValue = (rowKey: string, column: BlueprintColumn): string | string[] => {
  switch (rowKey) {
    case 'action':
      return column.action.label
    case 'touchpoints':
      return column.touchpoints.map((item) => item.label)
    case 'opportunities':
      return column.opportunities.map((item) => item.label)
    case 'visibility':
      return 'Customer-facing experience'
    case 'businessProcesses':
      return column.businessProcesses.map((item) => item.label)
    case 'technicalProcesses':
      return column.technicalProcesses.map((item) => item.label)
    case 'recommendations':
      return column.recommendations.map((item) => item.label)
    default:
      return ''
  }
}

const getCellVariant = (rowKey: string, column: BlueprintColumn) => {
  if (rowKey === 'action') {
    return column.action.type
  }

  if (rowKey === 'opportunities') {
    return 'opportunity'
  }

  if (rowKey === 'recommendations') {
    return 'default'
  }

  return 'default'
}
</script>

<template>
  <div class="blueprint-canvas">
    <div class="blueprint-scroll">
      <div class="blueprint-grid" :style="gridStyle">
        <div class="matrix-corner">Journey</div>

        <template v-for="phase in project.phases" :key="phase.id">
          <div
            class="phase-header"
            :style="{
              gridColumn: `${phaseColumnStart(phase.id)} / span ${phase.columns.length}`,
            }"
          >
            {{ phase.name }}
          </div>
        </template>

        <template v-for="column in columns" :key="column.id">
          <div class="journey-header">{{ column.name }}</div>
        </template>

        <template v-for="row in rowDefinitions" :key="row.key">
          <BlueprintRowLabel :label="row.label" />
          <template v-if="row.key === 'moments'">
            <div
              v-for="phase in project.phases"
              :key="`${row.key}-${phase.id}`"
              class="moment-cell"
              :style="{ gridColumn: `span ${phase.columns.length}` }"
            >
              <strong class="moment-title">★ {{ phase.moment?.title || 'Add a moment that matters' }}</strong>
              <span v-if="phase.moment?.detail" class="moment-detail">{{ phase.moment.detail }}</span>
            </div>
          </template>
          <template v-else>
            <template v-for="column in columns" :key="`${row.key}-${column.id}`">
              <BlueprintCell
                :value="getCellValue(row.key, column)"
                :variant="getCellVariant(row.key, column)"
              />
            </template>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
