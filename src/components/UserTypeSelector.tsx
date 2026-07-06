import { GraduationCap, Briefcase } from 'lucide-react'
import type { UserType } from '../types'

interface UserTypeSelectorProps {
  userType: UserType
  onUserTypeChange: (type: UserType) => void
}

export function UserTypeSelector({ userType, onUserTypeChange }: UserTypeSelectorProps) {
  const options: { value: UserType; label: string; icon: typeof GraduationCap }[] = [
    { value: 'fresh', label: '应届生', icon: GraduationCap },
    { value: 'experienced', label: '职场人', icon: Briefcase }
  ]

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">身份选择</span>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1.5 w-full sm:w-auto">
        {options.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onUserTypeChange(value)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              userType === value
                ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Icon size={16} className={userType === value ? 'text-primary-500' : ''} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}