import type { ActionType } from '../types/blueprint'

export const actionLabelMap: Record<ActionType, string> = {
  neutral: 'Neutral',
  gain: 'Gain point',
  pain: 'Pain point',
}

export function getActionTone(type: ActionType): string {
  return type === 'gain' ? 'gain' : type === 'pain' ? 'pain' : 'neutral'
}

export function safelyFormatList(values: string[]): string {
  return values.filter(Boolean).join(' • ')
}
