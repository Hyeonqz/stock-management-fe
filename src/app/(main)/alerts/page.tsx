import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import { Bell, Plus } from 'lucide-react'

export default function AlertsPage() {
  return (
    <div>
      <PageHeader
        title="알림 조건"
        right={
          <button
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-white"
            style={{ background: 'var(--brand)' }}
          >
            <Plus size={12} />
            추가
          </button>
        }
      />

      <div className="flex flex-col gap-3 px-4 py-3">
        {/* 준비중 배너 */}
        <Card padding="lg" className="flex flex-col items-center py-12 text-center">
          <Bell size={40} style={{ color: 'var(--text-secondary)' }} />
          <p className="mt-3 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            알림 조건 관리
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Phase 2에서 구현 예정이에요
          </p>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
            가격 도달, 수익률 변동, 거래량 급등 알림을 설정할 수 있어요
          </p>
        </Card>
      </div>
    </div>
  )
}
