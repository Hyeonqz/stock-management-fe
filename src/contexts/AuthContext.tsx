'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi, clearTokens, getAccessToken, getRefreshToken, storeTokens, userApi } from '@/lib/api'
import type { User } from '@/lib/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, nickname?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // 앱 시작 시 토큰 유무로 사용자 정보 복원
  useEffect(() => {
    const token = getAccessToken()
    if (!token) {
      setState({ user: null, isLoading: false, isAuthenticated: false })
      return
    }
    userApi
      .me()
      .then((user) => setState({ user, isLoading: false, isAuthenticated: true }))
      .catch(() => {
        clearTokens()
        setState({ user: null, isLoading: false, isAuthenticated: false })
      })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const tokens = await authApi.login(email, password)
    storeTokens(tokens)
    const user = await userApi.me()
    setState({ user, isLoading: false, isAuthenticated: true })
    router.push('/')
  }, [router])

  const signup = useCallback(async (email: string, password: string, nickname?: string) => {
    await authApi.signup(email, password, nickname)
    // 가입 후 자동 로그인
    await login(email, password)
  }, [login])

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      await authApi.logout(refreshToken).catch(() => {})
    }
    clearTokens()
    setState({ user: null, isLoading: false, isAuthenticated: false })
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
