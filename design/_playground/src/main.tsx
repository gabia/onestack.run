import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ComponentIndex from './ComponentIndex'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

const componentModules = import.meta.glob<{ default: React.ComponentType }>('@components/**/*.tsx')

const params = new URLSearchParams(window.location.search)

let selectionModeEnabled = params.get('selectionMode') === 'true'
let selectedElement: HTMLElement | null = null
let hoverElement: HTMLElement | null = null
let overlayBox: HTMLDivElement | null = null
let overlayBadge: HTMLDivElement | null = null
let listenersBound = false
let renderToken = 0

function ensureOverlay(): void {
  if (overlayBox && overlayBadge) return
  overlayBox = document.createElement('div')
  overlayBox.style.position = 'fixed'
  overlayBox.style.pointerEvents = 'none'
  overlayBox.style.zIndex = '2147483647'
  overlayBox.style.boxSizing = 'border-box'
  overlayBox.style.display = 'none'
  overlayBox.style.borderRadius = '8px'
  overlayBox.style.transition = 'all 90ms ease-out'

  overlayBadge = document.createElement('div')
  overlayBadge.style.position = 'fixed'
  overlayBadge.style.pointerEvents = 'none'
  overlayBadge.style.zIndex = '2147483647'
  overlayBadge.style.display = 'none'
  overlayBadge.style.padding = '5px 8px'
  overlayBadge.style.borderRadius = '8px'
  overlayBadge.style.border = '1px solid #93c5fd'
  overlayBadge.style.background = 'rgba(239, 246, 255, 0.96)'
  overlayBadge.style.color = '#1d4ed8'
  overlayBadge.style.fontSize = '11px'
  overlayBadge.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace'
  overlayBadge.style.maxWidth = 'calc(100vw - 20px)'
  overlayBadge.style.overflow = 'hidden'
  overlayBadge.style.textOverflow = 'ellipsis'
  overlayBadge.style.whiteSpace = 'nowrap'

  document.documentElement.appendChild(overlayBox)
  document.documentElement.appendChild(overlayBadge)
}

function hideOverlay(): void {
  if (overlayBox) overlayBox.style.display = 'none'
  if (overlayBadge) overlayBadge.style.display = 'none'
}

function renderOverlay(target: HTMLElement, selected: boolean): void {
  ensureOverlay()
  if (!overlayBox || !overlayBadge) return
  const rect = target.getBoundingClientRect()
  overlayBox.style.display = 'block'
  overlayBox.style.top = `${Math.max(0, rect.top)}px`
  overlayBox.style.left = `${Math.max(0, rect.left)}px`
  overlayBox.style.width = `${Math.max(1, rect.width)}px`
  overlayBox.style.height = `${Math.max(1, rect.height)}px`
  overlayBox.style.border = selected ? '2px solid #2563eb' : '2px dashed #60a5fa'
  overlayBox.style.background = selected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.04)'
  overlayBox.style.boxShadow = selected ? '0 0 0 1px rgba(37,99,235,0.2)' : 'none'

  if (selected) {
    overlayBadge.textContent = '선택됨'
    overlayBadge.style.display = 'block'
    const badgeTop = Math.max(8, rect.top - 32)
    const badgeLeft = Math.min(window.innerWidth - 300, Math.max(8, rect.left))
    overlayBadge.style.top = `${badgeTop}px`
    overlayBadge.style.left = `${badgeLeft}px`
  } else {
    overlayBadge.style.display = 'none'
  }
}

function collectComputedStyle(target: HTMLElement) {
  const s = window.getComputedStyle(target)
  return {
    fontFamily: s.fontFamily,
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    textAlign: s.textAlign,
    color: s.color,
    backgroundColor: s.backgroundColor,
    padding: s.padding,
    margin: s.margin,
    border: s.border,
    borderRadius: s.borderRadius,
    width: s.width,
    height: s.height,
    display: s.display,
    position: s.position,
    gap: s.gap,
    alignItems: s.alignItems,
    justifyContent: s.justifyContent,
  }
}

function setupSelectionMode(): void {
  if (listenersBound) return
  listenersBound = true

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!selectionModeEnabled) return
    const target = (e.target as HTMLElement | null)?.closest('[data-plid]') as HTMLElement | null
    hoverElement = target
    if (!selectedElement && hoverElement) {
      renderOverlay(hoverElement, false)
    }
  }, true)

  document.addEventListener('click', (e: MouseEvent) => {
    if (!selectionModeEnabled) return

    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()

    const target = (e.target as HTMLElement).closest('[data-plid]') as HTMLElement | null
    if (!target) {
      selectedElement = null
      hideOverlay()
      window.parent.postMessage({ type: 'elementDeselected' }, window.location.origin)
      return
    }

    selectedElement = target
    renderOverlay(selectedElement, true)

    const plid = target.getAttribute('data-plid') || ''

    window.parent.postMessage({
      type: 'elementSelected',
      data: {
        plid,
        outerHTML: target.outerHTML.slice(0, 500),
        tagName: target.tagName,
        computedStyle: collectComputedStyle(target),
      }
    }, window.location.origin)
  }, true)

  const syncOverlay = () => {
    if (!selectionModeEnabled) return
    if (selectedElement) {
      renderOverlay(selectedElement, true)
      return
    }
    if (hoverElement) {
      renderOverlay(hoverElement, false)
      return
    }
    hideOverlay()
  }

  window.addEventListener('scroll', syncOverlay, true)
  window.addEventListener('resize', syncOverlay)

  window.addEventListener('message', (e: MessageEvent) => {
    const { type, data } = e.data || {}

    switch (type) {
      case 'setSelectionMode':
        selectionModeEnabled = data.enabled
        if (!selectionModeEnabled) {
          selectedElement = null
          hoverElement = null
          hideOverlay()
        } else if (selectedElement) {
          renderOverlay(selectedElement, true)
        }
        break
      case 'clearSelection':
        selectedElement = null
        if (selectionModeEnabled && hoverElement) {
          renderOverlay(hoverElement, false)
        } else {
          hideOverlay()
        }
        window.parent.postMessage({ type: 'elementDeselected' }, window.location.origin)
        break
    }
  })
}

function computeRouterBasename(): string {
  const marker = '/api/preview/dist/'
  const pathname = window.location.pathname
  const idx = pathname.indexOf(marker)
  if (idx < 0) return ''
  return pathname.slice(0, idx + marker.length - 1)
}

function normalizeComponentPath(input: string): string {
  const trimmed = input.trim().replace(/^\/+/, '').replace(/\/+$/, '')
  const withoutPrefix = trimmed.startsWith('design/_playground/components/')
    ? trimmed.slice('design/_playground/components/'.length)
    : trimmed
  const noExt = withoutPrefix.endsWith('.tsx') ? withoutPrefix.slice(0, -4) : withoutPrefix
  return noExt
}

function resolveImporter(input: string): (() => Promise<{ default: React.ComponentType }>) | null {
  // First try direct @components import
  let exactKey = `@components/${normalizeComponentPath(input)}.tsx`
  let exact = componentModules[exactKey]
  if (exact) return exact

  // Fallback to searching all keys
  const normalized = normalizeComponentPath(input)
  const keys = Object.keys(componentModules)
  
  const byNormalizedTail = keys.find((k) => k.endsWith(`/${normalized}.tsx`))
  if (byNormalizedTail) return componentModules[byNormalizedTail]

  const tail3 = normalized.split('/').filter(Boolean).slice(-3).join('/')
  if (tail3) {
    const byTail3 = keys.find((k) => k.endsWith(`/${tail3}.tsx`))
    if (byTail3) return componentModules[byTail3]
  }

  const tail2 = normalized.split('/').filter(Boolean).slice(-2).join('/')
  if (tail2) {
    const byTail2 = keys.find((k) => k.endsWith(`/${tail2}.tsx`))
    if (byTail2) return componentModules[byTail2]
  }

  return null
}

function usePlanaRouteClickBridge(): void {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (selectionModeEnabled) return
      const target = (e.target as HTMLElement | null)?.closest('[data-plana-route],[data-route]') as HTMLElement | null
      if (!target) return
      const route = target.getAttribute('data-plana-route') || target.getAttribute('data-route') || ''
      const trimmed = route.trim()
      if (!trimmed) return

      e.preventDefault()
      e.stopPropagation()

      const normalized = normalizeComponentPath(trimmed)
      const nextSearchParams = new URLSearchParams(location.search)
      nextSearchParams.set('selectionMode', selectionModeEnabled ? 'true' : 'false')
      const nextSearch = nextSearchParams.toString()

      navigate(
        {
          pathname: normalized ? `/${normalized}` : '/',
          search: nextSearch ? `?${nextSearch}` : '',
        },
        { replace: false },
      )
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [location.search, navigate])
}

function ComponentRoute(): React.ReactElement {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const requestIdRef = useRef(0)

  const wildcard = (params['*'] || '').trim()
  const queryComponent = (searchParams.get('component') || '').trim()
  const requestedRaw = wildcard || queryComponent || ''

  const requested = useMemo(() => {
    const trimmed = requestedRaw.trim()
    return trimmed ? normalizeComponentPath(trimmed) : null
  }, [requestedRaw])

  const [LoadedComponent, setLoadedComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const requestId = ++requestIdRef.current
    setError(null)
    setLoadedComponent(null)

    if (!requested) {
      window.parent.postMessage({ type: 'loaded' }, window.location.origin)
      return
    }

    const token = ++renderToken
    ;(async () => {
      try {
        const importer = resolveImporter(requested)
        if (!importer) throw new Error(`component_not_found:${requested}`)
        const module = await importer()
        if (token !== renderToken) return
        if (requestId !== requestIdRef.current) return
        setLoadedComponent(() => module.default)
        requestAnimationFrame(() => {
          if (requestId !== requestIdRef.current) return
          window.parent.postMessage({ type: 'loaded' }, window.location.origin)
        })
      } catch (err) {
        if (token !== renderToken) return
        if (requestId !== requestIdRef.current) return
        const message = String(err)
        setError(message)
        requestAnimationFrame(() => {
          if (requestId !== requestIdRef.current) return
          window.parent.postMessage({ type: 'error', data: { message } }, window.location.origin)
        })
      }
    })()
  }, [requested])

  if (!requested) {
    return <ComponentIndex />
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        컴포넌트 로드 실패: {error}
      </div>
    )
  }

  if (!LoadedComponent) {
    return (
      <div className="p-8 text-center text-gray-500">
        로딩 중...
      </div>
    )
  }

  return <LoadedComponent />
}

function GlobalBindings(): null {
  usePlanaRouteClickBridge()

  useEffect(() => {
    setupSelectionMode()
  }, [])

  return null
}

function PlaygroundApp(): React.ReactElement {
  const basename = useMemo(() => computeRouterBasename(), [])
  return (
    <BrowserRouter basename={basename}>
      <GlobalBindings />
      <Routes>
        <Route path="/*" element={<ComponentRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlaygroundApp />
  </React.StrictMode>,
)
