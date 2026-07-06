import { Target, TrendingUp, Lightbulb } from 'lucide-react'
import type { MatchingSuggestions } from '../types'

interface MatchingSuggestionsCardProps {
  suggestions: MatchingSuggestions
  isDark: boolean
}

export function MatchingSuggestionsCard({ suggestions, isDark }: MatchingSuggestionsCardProps) {
  const getMatchColor = (match: number) => {
    if (match >= 80) return 'text-green-500 bg-green-50 dark:bg-green-900/30'
    if (match >= 60) return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'
    return 'text-red-500 bg-red-50 dark:bg-red-900/30'
  }

  const getBarColor = (match: number) => {
    if (match >= 80) return 'bg-green-500'
    if (match >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={`rounded-2xl border p-6 card-hover animate-slide-up ${isDark ? 'bg-gray-900 border-gray-800 hover:shadow-xl' : 'bg-white border-gray-100 hover:shadow-lg'}`} style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
          <Target size={20} className="text-blue-500" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white">
            职位匹配建议
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            综合匹配分析
          </p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">整体匹配度</span>
          <span className={`text-xl font-display font-bold ${suggestions.overallMatch >= 70 ? 'text-green-500' : suggestions.overallMatch >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
            {suggestions.overallMatch}%
          </span>
        </div>
        <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(suggestions.overallMatch)}`}
            style={{ width: `${suggestions.overallMatch}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5">
          {suggestions.overallMatch >= 80 ? '匹配度很高，继续保持！' : suggestions.overallMatch >= 60 ? '匹配度良好，可进一步优化' : '建议根据匹配建议进行针对性优化'}
        </p>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-primary-500" />
          <span className="text-sm font-medium text-gray-800 dark:text-white">核心技能匹配</span>
        </div>
        <div className="space-y-3">
          {suggestions.keySkills.map((skill, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-800 dark:text-white">{skill.skill}</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${getMatchColor(skill.match)}`}>
                  {skill.match}%
                </span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(skill.match)}`}
                  style={{ width: `${skill.match}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-lime-500" />
          <span className="text-sm font-medium text-gray-800 dark:text-white">优化建议</span>
        </div>
        <ul className="space-y-2">
          {suggestions.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-lime-500 mt-1.5 flex-shrink-0" />
              <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}