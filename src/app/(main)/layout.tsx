import BottomNav from '@/components/layout/BottomNav'
import { RequireAuth } from '@/components/auth/AuthGuard'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="flex min-h-full flex-col">
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </div>
    </RequireAuth>
  )
}
