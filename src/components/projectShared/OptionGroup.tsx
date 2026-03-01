interface Props {
  label: string
  hint?: string
  options: string[]
  value: string
  onChange: (v: string) => void
}

export function OptionGroup({ label, hint, options, value, onChange }: Props) {
  return (
    <div className="mb-8">
      <p className="text-sm font-medium mb-1">{label}</p>
      {hint && <p className="text-xs text-muted-foreground mb-3">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 text-sm border transition-all duration-150 ${
              value === opt
                ? "bg-foreground text-white border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
