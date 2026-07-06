import { useState, useEffect } from 'react'
import { Sparkles, Loader2, Moon, Sun, ChevronRight } from 'lucide-react'
import { UserTypeSelector } from './components/UserTypeSelector'
import { InputSection } from './components/InputSection'
import { DiagnosisCard } from './components/DiagnosisCard'
import { OptimizedResumeCard } from './components/OptimizedResumeCard'
import { MatchingSuggestionsCard } from './components/MatchingSuggestionsCard'
import { optimizeResume } from './utils/api'
import type { UserType, ResumeOptimizationResponse } from './types'

function App() {
  const [userType, setUserType] = useState<UserType>('fresh')
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ResumeOptimizationResponse | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [headerVisible, setHeaderVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)

      if (currentScrollY < 50) {
        setHeaderVisible(true)
      } else if (currentScrollY < lastScroll) {
        setHeaderVisible(true)
      } else {
        setHeaderVisible(false)
      }

      lastScroll = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const handleOptimize = async () => {
    if (!resume.trim() || !jd.trim()) {
      alert('请填写简历内容和岗位JD')
      return
    }

    setIsLoading(true)
    try {
      const response = await optimizeResume({ userType, resume, jd })
      setResult(response)
    } catch (error) {
      console.error('优化失败:', error)
      alert('优化失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
        }}
      >
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-primary-900/20' : 'bg-primary-200/20'}`} />
        <div className={`absolute bottom-40 right-20 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-lime-900/20' : 'bg-lime-200/20'}`} />
        <div
          className={`absolute top-1/3 right-1/4 w-48 h-48 rounded-full blur-2xl ${isDark ? 'bg-primary-800/10' : 'bg-primary-300/10'}`}
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        } ${headerVisible ? '' : 'hidden-header'} ${isDark ? 'bg-gray-950/80' : 'bg-white/80'} backdrop-blur-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-lime-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold bg-gradient-to-r from-primary-600 to-lime-500 bg-clip-text text-transparent">
                  ResumeAI
                </h1>
                <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  智能简历优化
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-primary-500 hover:text-white group ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              {isDark ? (
                <Sun size={18} className="transition-transform duration-300 group-hover:rotate-180" />
              ) : (
                <Moon size={18} className="transition-transform duration-300 group-hover:rotate-180" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-hero-lg font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-lime-500 bg-clip-text text-transparent">
              让你的简历脱颖而出
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            AI 驱动的智能分析，精准匹配目标岗位，一键生成专业优化建议
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 card-hover ${isDark ? 'bg-gray-900 border-gray-800 hover:shadow-xl' : 'bg-white border-gray-100 hover:shadow-lg'}`}>
              <UserTypeSelector userType={userType} onUserTypeChange={setUserType} />
            </div>

            <div className={`rounded-2xl border p-6 card-hover ${isDark ? 'bg-gray-900 border-gray-800 hover:shadow-xl' : 'bg-white border-gray-100 hover:shadow-lg'}`}>
              <h2 className={`text-lg font-display font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <span className="w-1 h-5 bg-gradient-to-b from-primary-500 to-lime-500 rounded-full" />
                输入信息
              </h2>
              <InputSection
                resume={resume}
                jd={jd}
                onResumeChange={setResume}
                onJdChange={setJd}
                isDark={isDark}
              />
            </div>

            <button
              onClick={handleOptimize}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-display font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 btn-primary ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 hover:from-primary-500 hover:via-primary-400 hover:to-primary-500 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>正在分析优化中...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>开始优化简历</span>
                  <ChevronRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            {result ? (
              <>
                <DiagnosisCard issues={result.diagnosis.issues} isDark={isDark} />
                <OptimizedResumeCard content={result.optimizedResume} isDark={isDark} />
                <MatchingSuggestionsCard suggestions={result.matchingSuggestions} isDark={isDark} />
              </>
            ) : (
              <div className={`rounded-2xl border p-12 text-center animate-fade-in ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <div className="relative inline-block mb-6">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center animate-float ${isDark ? 'bg-primary-900/50' : 'bg-gradient-to-br from-primary-100 to-lime-100'}`}>
                    <Sparkles size={32} className="text-primary-500" />
                  </div>
                  <div className={`absolute -inset-4 rounded-full blur-xl opacity-30 animate-pulse ${isDark ? 'bg-primary-900/50' : 'bg-gradient-to-br from-primary-200 to-lime-200'}`} />
                </div>
                <h3 className={`text-xl font-display font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  准备好优化你的简历了吗？
                </h3>
                <p className={`max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  在左侧输入简历内容和目标岗位JD，AI 将为你提供专业的优化建议和匹配分析
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={`relative z-10 border-t mt-12 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              ResumeAI · 智能简历优化工具 MVP
            </p>
            <div className="flex items-center gap-4">
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                预留大模型接口
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
                <span className="text-xs text-lime-500 font-medium">AI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App