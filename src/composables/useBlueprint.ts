import { ref } from 'vue'
import blueprintData from '../data/blueprintData.json'
import type { BlueprintColumn, BlueprintProject, Recommendation } from '../types/blueprint'
import { loadStoredBlueprint, saveBlueprintToStorage } from './useBlueprintStorage'

const cloneProject = (project: BlueprintProject): BlueprintProject =>
  JSON.parse(JSON.stringify(project)) as BlueprintProject

const defaultProject = cloneProject(blueprintData as BlueprintProject)
const hydratePhaseMoments = (project: BlueprintProject): BlueprintProject => ({
  ...project,
  phases: project.phases.map((phase) => ({
    ...phase,
    moment: phase.moment ?? defaultProject.phases.find((defaultPhase) => defaultPhase.id === phase.id)?.moment,
  })),
})

const createEmptyColumn = (): BlueprintColumn => ({
  id: `column-${crypto.randomUUID()}`,
  name: 'New Journey Stage',
  action: {
    id: `action-${crypto.randomUUID()}`,
    label: 'Describe the user action',
    type: 'neutral',
  },
  touchpoints: [{ id: `touchpoint-${crypto.randomUUID()}`, label: 'Touchpoint' }],
  opportunities: [{ id: `opportunity-${crypto.randomUUID()}`, label: 'Opportunity' }],
  businessProcesses: [{ id: `business-${crypto.randomUUID()}`, label: 'Business process' }],
  technicalProcesses: [{ id: `technical-${crypto.randomUUID()}`, label: 'Technical process' }],
  recommendations: [{ id: `recommendation-${crypto.randomUUID()}`, label: 'Recommendation' }],
})

const createEmptyRecommendation = (): Recommendation => ({
  id: `recommendation-${crypto.randomUUID()}`,
  label: 'Add recommendation',
})

export function useBlueprint() {
  const project = ref<BlueprintProject>(
    cloneProject(hydratePhaseMoments(loadStoredBlueprint() ?? defaultProject)),
  )
  const isEditMode = ref(false)

  const persistProject = (nextProject: BlueprintProject) => {
    project.value = cloneProject(nextProject)
    saveBlueprintToStorage(project.value)
  }

  const resetProject = () => {
    persistProject(defaultProject)
    isEditMode.value = false
  }

  const exportProject = (): string => JSON.stringify(project.value, null, 2)

  const importProject = (rawJson: string) => {
    const parsed = JSON.parse(rawJson) as BlueprintProject

    if (!parsed?.title || !parsed?.phases) {
      throw new Error('Imported blueprint is missing required fields.')
    }

    persistProject(parsed)
    isEditMode.value = true
  }

  const addColumn = (phaseIndex: number) => {
    const phase = project.value.phases[phaseIndex]
    if (!phase) {
      return
    }

    phase.columns.push(createEmptyColumn())
    saveBlueprintToStorage(project.value)
  }

  const deleteColumn = (phaseIndex: number, columnIndex: number) => {
    const phase = project.value.phases[phaseIndex]
    if (!phase || phase.columns.length <= 1) {
      return
    }

    phase.columns.splice(columnIndex, 1)
    saveBlueprintToStorage(project.value)
  }

  const addRecommendation = (phaseIndex: number, columnIndex: number) => {
    const phase = project.value.phases[phaseIndex]
    const column = phase?.columns[columnIndex]
    if (!column) {
      return
    }

    column.recommendations.push(createEmptyRecommendation())
    saveBlueprintToStorage(project.value)
  }

  const deleteRecommendation = (phaseIndex: number, columnIndex: number, recommendationIndex: number) => {
    const phase = project.value.phases[phaseIndex]
    const column = phase?.columns[columnIndex]
    if (!column || column.recommendations.length <= 1) {
      return
    }

    column.recommendations.splice(recommendationIndex, 1)
    saveBlueprintToStorage(project.value)
  }

  return {
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
  }
}
