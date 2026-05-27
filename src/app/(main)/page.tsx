import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'
import { RefreshCw } from 'lucide-react'

// TODO: 실제 API 연동 시 서버 컴포넌트에서 데이터 페칭으로 교체
export default function PortfolioPage() {
  return (
    <div>
      <PageHeader
        title="포트폴리오"
        right={
          <button
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--brand)' }}
          >
            <RefreshCw size={12} />
            새로고침
          </button>
        }
      />

      <div className="flex flex-col gap-3 px-4 py-3">
        {/* Toss API Key 미등록 배너 — 등록 후 숨김 처리 예정 */}
        <Card padding="md" className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Toss API Key를 연결해주세요
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              토스증권 계좌를 연결하면 포트폴리오를 확인할 수 있어요
            </p>
          </div>
          <button
            className="ml-3 shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
            style={{ background: 'var(--brand)' }}
          >
            연결하기
          </button>
        </Card>

        {/* 총 평가금액 카드 */}
        <Card padding="lg">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            총 평가금액
          </p>
          <p className="mt-1 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            ₩12,345,678
          </p>
          <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--positive)' }}>
            +₩1,345,678 (+13.64%)
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg p-3" style={{ background: 'var(--background)' }}>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                투자금액
              </p>
              <p className="mt-0.5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                ₩11,000,000
              </p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'var(--background)' }}>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                평가손익
              </p>
              <p className="mt-0.5 text-sm font-semibold" style={{ color: 'var(--positive)' }}>
                +₩1,345,678
              </p>
            </div>
          </div>
        </Card>

        {/* 국내/해외 비중 */}
        <Card padding="md">
          <p className="mb-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            시장별 비중
          </p>
          <div className="flex overflow-hidden rounded-full" style={{ height: 8, background: 'var(--border)' }}>
            <div className="h-full rounded-l-full" style={{ width: '65%', background: 'var(--brand)' }} />
            <div className="h-full rounded-r-full" style={{ width: '35%', background: 'var(--positive)' }} />
          </div>
          <div className="mt-2 flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span>
              <span className="inline-block h-2 w-2 rounded-full mr-1" style={{ background: 'var(--brand)' }} />
              국내 65.0%
            </span>
            <span>
              <span className="inline-block h-2 w-2 rounded-full mr-1" style={{ background: 'var(--positive)' }} />
              해외 35.0%
            </span>
          </div>
        </Card>

        {/* 보유종목 섹션 */}
        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              보유종목 <span style={{ color: 'var(--text-secondary)' }}>8</span>
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              마지막 업데이트 09:01
            </p>
          </div>

          {/* 종목 카드 목록 — TODO: HoldingCard 컴포넌트로 분리 예정 */}
          <div className="flex flex-col gap-2">
            {MOCK_HOLDINGS.map((h) => (
              <Card key={h.ticker} padding="md" className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {h.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {h.ticker} · {h.market === 'DOMESTIC' ? '국내' : '해외'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {h.evalAmount}
                  </p>
                  <p
                    className="text-xs font-medium"
                    style={{ color: h.pnlRate >= 0 ? 'var(--positive)' : 'var(--negative)' }}
                  >
                    {h.pnlRate >= 0 ? '+' : ''}{h.pnlRate}%
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MOCK_HOLDINGS = [
  { ticker: '005930', name: '삼성전자', market: 'DOMESTIC', evalAmount: '₩755,000', pnlRate: 4.86 },
  { ticker: '000660', name: 'SK하이닉스', market: 'DOMESTIC', evalAmount: '₩382,000', pnlRate: -2.11 },
  { ticker: 'NVDA', name: 'NVIDIA', market: 'OVERSEAS', evalAmount: '$1,240', pnlRate: 12.4 },
  { ticker: 'AAPL', name: 'Apple', market: 'OVERSEAS', evalAmount: '$820', pnlRate: -0.8 },
]
