import { FileText, FileSearch } from 'lucide-react'

interface InputSectionProps {
  resume: string
  jd: string
  onResumeChange: (value: string) => void
  onJdChange: (value: string) => void
  isDark: boolean
}

export function InputSection({ resume, jd, onResumeChange, onJdChange, isDark }: InputSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary-900/30' : 'bg-primary-50'}`}>
            <FileText size={16} className="text-primary-500" />
          </div>
          简历内容
        </label>
        <textarea
          value={resume}
          onChange={(e) => onResumeChange(e.target.value)}
          placeholder="请粘贴您的简历内容..."
          className={`w-full h-48 px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${
            isDark
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
              : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10'
          }`}
        />
        <div className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
          提示：请输入完整的简历内容，包括个人信息、教育背景、工作/项目经验等
        </div>
      </div>

      <div className="space-y-2.5">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-lime-900/30' : 'bg-lime-50'}`}>
            <FileSearch size={16} className="text-lime-500" />
          </div>
          岗位JD
        </label>
        <textarea
          value={jd}
          onChange={(e) => onJdChange(e.target.value)}
          placeholder="请粘贴目标岗位的JD描述..."
          className={`w-full h-48 px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${
            isDark
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20'
              : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/10'
          }`}
        />
        <div className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          <span className="w-1.5 h-1.5 bg-lime-500 rounded-full" />
          提示：请输入岗位的完整JD，包括职责描述、任职要求等
        </div>
      </div>
    </div>
  )
}