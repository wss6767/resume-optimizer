import { useState } from 'react'
import { FileText, Copy, Check } from 'lucide-react'

interface OptimizedResumeCardProps {
  content: string
  isDark: boolean
}

export function OptimizedResumeCard({ content, isDark }: OptimizedResumeCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`rounded-2xl border p-6 card-hover animate-slide-up ${isDark ? 'bg-gray-900 border-gray-800 hover:shadow-xl' : 'bg-white border-gray-100 hover:shadow-lg'}`} style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-green-900/30' : 'bg-green-50'}`}>
            <FileText size={20} className="text-green-500" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white">
              优化后简历
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              AI 智能优化建议
            </p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            copied
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : isDark
              ? 'bg-gray-800 text-gray-300 hover:bg-primary-500 hover:text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-primary-500 hover:text-white'
          }`}
        >
          {copied ? (
            <>
              <Check size={14} />
              已复制
            </>
          ) : (
            <>
              <Copy size={14} />
              复制
            </>
          )}
        </button>
      </div>

      <div className={`rounded-xl p-4 max-h-80 overflow-y-auto ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <pre className="text-xs text-gray-800 dark:text-white whitespace-pre-wrap font-body leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  )
}