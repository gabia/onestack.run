import React from 'react'
import { useNavigate } from 'react-router-dom'

const componentModules = import.meta.glob<{ default: React.ComponentType }>('@components/**/*.tsx')

function getComponentList(): string[] {
  return Object.keys(componentModules)
    .map((key) => {
      // key like: @components/AdminDashboard.tsx or @components/planning-brief/PlanningBrief.tsx
      const match = key.match(/^@components\/(.+)\.tsx$/)
      return match ? match[1] : null
    })
    .filter((x): x is string => Boolean(x))
    .sort()
}

function displayName(path: string): string {
  const parts = path.split('/')
  const last = parts[parts.length - 1]
  return last.replace(/([A-Z])/g, ' $1').trim()
}

export default function ComponentIndex() {
  const navigate = useNavigate()
  const components = getComponentList()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">화면 목록</h1>
        <p className="text-gray-500 text-sm mb-8">화면을 클릭하면 미리보기가 표시됩니다.</p>
        {components.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <div className="text-4xl mb-3">🎨</div>
            <p>아직 생성된 화면이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {components.map((path) => (
              <button
                key={path}
                type="button"
                onClick={() => navigate(`/${path}`)}
                className="w-full text-left px-5 py-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {displayName(path)}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 font-mono">{path}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
