'use client'

import { useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import { useAuth } from '@/contexts/AuthContext'
import { ApiException } from '@/lib/api'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof ApiException ? err.message : '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
              style={{
                background: 'var(--background)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {error && (
            <p className="rounded-lg px-3 py-2 text-sm" style={{ background: '#fef2f2', color: 'var(--negative)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-lg py-3 text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: 'var(--brand)' }}
          >
            {loading ? '로그인 중...' : '로그인'}
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
