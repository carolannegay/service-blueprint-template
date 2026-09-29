<script setup lang="ts">
import { computed } from 'vue'
import type { ActionType } from '../../types/blueprint'

const props = withDefaults(
  defineProps<{
    value?: string | string[]
    variant?: ActionType | 'default' | 'opportunity'
  }>(),
  {
    value: '',
    variant: 'default',
  },
)

const normalizedItems = computed(() => {
  if (Array.isArray(props.value)) {
    return props.value.filter(Boolean)
  }

  return props.value ? [props.value] : []
})

const toneClass = computed(() => (`cell--${props.variant}`))
</script>

<template>
  <div class="blueprint-cell" :class="toneClass">
    <template v-if="normalizedItems.length === 0">
      <span class="cell-empty">—</span>
    </template>
    <template v-else-if="normalizedItems.length === 1">
      {{ normalizedItems[0] }}
    </template>
    <template v-else>
      <ul class="cell-list">
        <li v-for="item in normalizedItems" :key="item">{{ item }}</li>
      </ul>
    </template>
  </div>
</template>
