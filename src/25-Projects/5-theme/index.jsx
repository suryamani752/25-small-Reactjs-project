
import React from 'react'
import { ThemeProvider } from '../../context/ThemeContext'
import ThemeSwitcher from './theme_switcher'
import { Link } from 'react-router-dom'

const DarkLightTheme = () => {
    return (
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="max-w-2xl mx-auto p-8">
              <h1 className="text-3xl font-bold mb-8">System-Light-Dark Theme</h1>
              <div className="space-y-4">
                <ThemeSwitcher />
                <div className="p-6 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <p>Current theme settings:</p>
                  <div className='mt-2 pl-6'>

                  <p>Suryamani Kumar</p>
                  <p>Visit 👉 <Link to="https://www.devwithsurya.com" className='underline'>Devwithsurya</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      )
}

export default DarkLightTheme