export interface User {
  id: number
  email: string
  nickname: string | null
  role: string
  hasTossCredential: boolean
  createdAt: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

export interface TossCredential {
  registered: boolean
  isValid: boolean
  verifiedAt: string | null
}

export interface Portfolio {
  totalValue: number
  totalCost: number
  totalPnl: number
  totalPnlRate: number
  syncStatus: 'PENDING' | 'SYNCING' | 'SUCCESS' | 'FAILED'
  lastSyncAt: string | null
  domesticRatio: number
  overseasRatio: number
}

export interface Holding {
  id: number
  ticker: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  evalAmount: number
  purchaseAmount: number
  pnl: number
  pnlRate: number
  market: 'DOMESTIC' | 'OVERSEAS'
  sector: string | null
}

export interface AlertRule {
  id: number
  name: string
  ticker: string
  alertType: AlertType
  thresholdValue: number
  channel: AlertChannel
  isActive: boolean
  cooldownMinutes: number
  lastTriggeredAt: string | null
  createdAt: string
}

export type AlertType =
  | 'PRICE_ABOVE'
  | 'PRICE_BELOW'
  | 'PCT_CHANGE_ABOVE'
  | 'PCT_CHANGE_BELOW'
  | 'VOLUME_SPIKE'
  | 'RSI_ABOVE'
  | 'RSI_BELOW'

export type AlertChannel = 'TELEGRAM' | 'SLACK' | 'BOTH'

export interface ApiError {
  code: string
  message: string
  path: string
  timestamp: string
}
