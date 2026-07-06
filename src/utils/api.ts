import type { ResumeOptimizationRequest, ResumeOptimizationResponse } from '../types'
import { generateMockResponse } from './mockData'

export const optimizeResume = async (
  request: ResumeOptimizationRequest
): Promise<ResumeOptimizationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return generateMockResponse(request.userType)
}

export const callLLMApi = async (
  _request: ResumeOptimizationRequest
): Promise<ResumeOptimizationResponse> => {
  throw new Error('LLM API 接口尚未实现，请使用 mock 数据进行演示')
}