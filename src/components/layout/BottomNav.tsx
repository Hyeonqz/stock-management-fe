'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Bell, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', icon: BarChart2, label: '포트폴리오' },
  { href: '/alerts', icon: Bell, label: '알림' },
  { href: '/settings', icon: Settings, label: '설정' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 px-6 py-1"
          >
            <Icon
              size={22}
              style={{ color: active ? 'var(--brand)' : 'var(--text-secondary)' }}
            />
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? 'var(--brand)' : 'var(--text-secondary)' }}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
