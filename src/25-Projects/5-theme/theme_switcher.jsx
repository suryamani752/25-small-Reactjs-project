import { useTheme } from '../../context/ThemeContext'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const themes = [
    { id: 'system', icon: <FiMonitor />, label: 'System' },
    { id: 'light', icon: <FiSun />, label: 'Light' },
    { id: 'dark', icon: <FiMoon />, label: 'Dark' }
  ]

  return (
    <div className="flex justify-center gap-3 w-fit p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`p-2 rounded-full flex items-center justify-center ${
            theme === t.id
              ? 'bg-white dark:bg-gray-700 text-blue-500'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher