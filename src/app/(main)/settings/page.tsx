import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import { ChevronRight, KeyRound, LogOut, User } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="설정" />

      <div className="flex flex-col gap-4 px-4 py-3">
        {/* 프로필 */}
        <Card padding="md">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-bold"
              style={{ background: 'var(--brand)' }}
            >
              진
            </div>
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                진형
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                user@example.com
              </p>
            </div>
          </div>
        </Card>

        {/* Toss API Key */}
        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            토스증권 연결
          </p>
          <Card padding="sm">
            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5">
              <KeyRound size={18} style={{ color: 'var(--brand)' }} />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Toss API Key
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  미등록 — 탭하여 등록하기
                </p>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>
          </Card>
        </div>

        {/* 계정 */}
        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            계정
          </p>
          <Card padding="sm">
            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5">
              <User size={18} style={{ color: 'var(--text-secondary)' }} />
              <p className="flex-1 text-left text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                프로필 수정
              </p>
              <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>

            <div className="mx-2 my-1" style={{ height: 1, background: 'var(--border)' }} />

            <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5">
              <LogOut size={18} style={{ color: 'var(--negative)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--negative)' }}>
                로그아웃
              </p>
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
