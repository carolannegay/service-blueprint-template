<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
  }>(),
  {
    label: '',
  },
)
</script>

<template>
  <div class="blueprint-row-label">
    {{ label }}
  </div>
</template>
