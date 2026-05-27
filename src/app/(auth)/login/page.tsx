import Link from 'next/link'
import Card from '@/components/ui/Card'

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          StockManager
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          토스증권 포트폴리오 대시보드
        </p>
      </div>

      <Card>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              이메일
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              비밀번호
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-lg py-3 text-sm font-semibold text-white"
            style={{ background: 'var(--brand)' }}
          >
            로그인
          </button>
        </form>
      </Card>

      <p className="mt-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        계정이 없으신가요?{' '}
        <Link href="/signup" className="font-medium" style={{ color: 'var(--brand)' }}>
          회원가입
        </Link>
      </p>
    </div>
  )
}
