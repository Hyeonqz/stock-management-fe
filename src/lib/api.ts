import type { TokenResponse, User, Portfolio, Holding, TossCredential, ApiError } from './types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

// ── Token storage ────────────────────────────────────────────────────────────

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refreshToken')
}

export function storeTokens(tokens: TokenResponse): void {
  localStorage.setItem('accessToken', tokens.accessToken)
  localStorage.setItem('refreshToken', tokens.refreshToken)
}

export function clearTokens(): void {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

// ── API Error ────────────────────────────────────────────────────────────────

export class ApiException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'ApiException'
  }
}

// ── Fetch client ─────────────────────────────────────────────────────────────

async function request<T>(path: string, init?: RequestInit, retry = true): Promise<T> {
  const accessToken = getAccessToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init?.headers,
    },
  })

  // Access token 만료 시 자동 갱신 후 재시도
  if (res.status === 401 && retry) {
    const refreshed = await tryRefresh()
    if (refreshed) return request<T>(path, init, false)
    clearTokens()
    window.location.href = '/login'
    throw new ApiException('AUTH_003', '인증이 필요합니다.', 401)
  }

  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({
      code: 'COMMON_500',
      message: '서버 오류가 발생했습니다.',
      path,
      timestamp: new Date().toISOString(),
    }))
    throw new ApiException(err.code, err.message, res.status)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return false

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  if (!res.ok) return false

  const tokens: TokenResponse = await res.json()
  storeTokens(tokens)
  return true
}

// ── Auth API ─────────────────────────────────────────────────────────────────

export const authApi = {
  signup: (email: string, password: string, nickname?: string) =>
    request<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, nickname }),
    }),

  login: (email: string, password: string) =>
    request<TokenResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: (refreshToken: string) =>
    request<void>('/auth/logout', {
      method: 'DELETE',
      body: JSON.stringify({ refreshToken }),
    }),
}

// ── User API ─────────────────────────────────────────────────────────────────

export const userApi = {
  me: () => request<User>('/api/v1/users/me'),

  getTossCredential: () =>
    request<TossCredential>('/api/v1/users/me/toss-credential'),

  registerTossCredential: (appKey: string, appSecret: string) =>
    request<TossCredential>('/api/v1/users/me/toss-credential', {
      method: 'POST',
      body: JSON.stringify({ appKey, appSecret }),
    }),

  updateTossCredential: (appKey: string, appSecret: string) =>
    request<TossCredential>('/api/v1/users/me/toss-credential', {
      method: 'PUT',
      body: JSON.stringify({ appKey, appSecret }),
    }),

  deleteTossCredential: () =>
    request<void>('/api/v1/users/me/toss-credential', { method: 'DELETE' }),
}

// ── Portfolio API ─────────────────────────────────────────────────────────────

export const portfolioApi = {
  get: () => request<Portfolio>('/api/v1/portfolio'),

  sync: () =>
    request<{ syncStatus: string; lastSyncAt: string; holdingCount: number }>(
      '/api/v1/portfolio/sync',
      { method: 'POST' },
    ),
}

// ── Holdings API ─────────────────────────────────────────────────────────────

export const holdingsApi = {
  list: (params?: { sort?: string; direction?: string; market?: string; search?: string }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString()
    return request<{ content: Holding[]; totalElements: number }>(`/api/v1/holdings${query ? `?${query}` : ''}`)
  },

  get: (ticker: string) => request<Holding>(`/api/v1/holdings/${ticker}`),
}
