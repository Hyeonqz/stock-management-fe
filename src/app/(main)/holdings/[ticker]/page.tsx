import PageHeader from '@/components/layout/PageHeader'
import Card from '@/components/ui/Card'

interface Props {
  params: Promise<{ ticker: string }>
}

export default async function HoldingDetailPage({ params }: Props) {
  const { ticker } = await params

  // TODO: 실제 API에서 GET /api/v1/holdings/{ticker} 호출
  return (
    <div>
      <PageHeader title={ticker} subtitle="보유종목 상세" />

      <div className="flex flex-col gap-3 px-4 py-3">
        {/* 현재가 카드 */}
        <Card padding="lg">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            현재가
          </p>
          <p className="mt-1 text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            ₩75,500
          </p>
          <p className="mt-0.5 text-sm font-medium" style={{ color: 'var(--positive)' }}>
            +₩3,500 (+4.86%)
          </p>
        </Card>

        {/* 보유 정보 */}
        <Card padding="md">
          <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            보유 정보
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '보유수량', value: '10주' },
              { label: '평균단가', value: '₩72,000' },
              { label: '평가금액', value: '₩755,000' },
              { label: '매입금액', value: '₩720,000' },
              { label: '평가손익', value: '+₩35,000', positive: true },
              { label: '수익률', value: '+4.86%', positive: true },
            ].map(({ label, value, positive }) => (
              <div key={label} className="rounded-lg p-3" style={{ background: 'var(--background)' }}>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {label}
                </p>
                <p
                  className="mt-0.5 text-sm font-semibold"
                  style={{ color: positive ? 'var(--positive)' : 'var(--text-primary)' }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 시장 정보 */}
        <Card padding="md">
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              시장
            </p>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ background: 'var(--brand)', color: 'white' }}
            >
              국내
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
