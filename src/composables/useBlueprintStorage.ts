import type { BlueprintProject } from '../types/blueprint'

const STORAGE_KEY = 'service-blueprint-template-project'

export function loadStoredBlueprint(): BlueprintProject | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as BlueprintProject
  } catch {
    return null
  }
}

export function saveBlueprintToStorage(project: BlueprintProject): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(project))
}
