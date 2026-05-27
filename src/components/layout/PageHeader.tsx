interface PageHeaderProps {
  title: string
  subtitle?: string
  right?: React.ReactNode
}

export default function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 py-4"
      style={{ background: 'var(--background)', borderBottom: `1px solid var(--border)` }}
    >
      <div>
        <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {right && <div>{right}</div>}
    </header>
  )
}
