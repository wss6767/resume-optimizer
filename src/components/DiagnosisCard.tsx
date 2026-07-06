import { AlertCircle, CheckCircle } from 'lucide-react'
import type { DiagnosisIssue } from '../types'

interface DiagnosisCardProps {
  issues: DiagnosisIssue[]
  isDark: boolean
}

export function DiagnosisCard({ issues, isDark }: DiagnosisCardProps) {
  return (
    <div className={`rounded-2xl border p-6 card-hover animate-slide-up ${isDark ? 'bg-gray-900 border-gray-800 hover:shadow-xl' : 'bg-white border-gray-100 hover:shadow-lg'}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
          <AlertCircle size={20} className="text-orange-500" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white">
            问题诊断
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            发现 {issues.length} 个可优化项
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`rounded-xl p-4 transition-all duration-200 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-1.5">
                  {issue.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2.5 leading-relaxed">
                  {issue.description}
                </p>
                <div className={`inline-flex items-start gap-2 rounded-lg px-3 py-2 ${isDark ? 'bg-primary-900/20' : 'bg-gradient-to-r from-primary-50 to-lime-50'}`}>
                  <span className="text-xs font-semibold text-primary-600 mt-0.5">💡</span>
                  <p className="text-xs text-primary-700 dark:text-primary-300 leading-relaxed">
                    {issue.suggestion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}