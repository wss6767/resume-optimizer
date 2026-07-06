export type UserType = 'fresh' | 'experienced'

export interface ResumeOptimizationRequest {
  userType: UserType
  resume: string
  jd: string
}

export interface DiagnosisIssue {
  title: string
  description: string
  suggestion: string
}

export interface KeySkillMatch {
  skill: string
  match: number
  suggestion: string
}

export interface MatchingSuggestions {
  overallMatch: number
  keySkills: KeySkillMatch[]
  recommendations: string[]
}

export interface ResumeOptimizationResponse {
  diagnosis: {
    issues: DiagnosisIssue[]
  }
  optimizedResume: string
  matchingSuggestions: MatchingSuggestions
}