export type ActionType = 'neutral' | 'gain' | 'pain'

export interface BlueprintProject {
  title: string
  subtitle: string
  client: string
  date: string
  owner: string
  phases: BlueprintPhase[]
}

export interface BlueprintPhase {
  id: string
  name: string
  moment?: {
    title: string
    detail: string
  }
  columns: BlueprintColumn[]
}

export interface BlueprintColumn {
  id: string
  name: string
  action: UserAction
  touchpoints: Touchpoint[]
  opportunities: Opportunity[]
  businessProcesses: BusinessProcess[]
  technicalProcesses: TechnicalProcess[]
  recommendations: Recommendation[]
}

export interface UserAction {
  id: string
  label: string
  type: ActionType
}

export interface Touchpoint {
  id: string
  label: string
}

export interface Opportunity {
  id: string
  label: string
}

export interface BusinessProcess {
  id: string
  label: string
}

export interface TechnicalProcess {
  id: string
  label: string
}

export interface Recommendation {
  id: string
  label: string
}
