interface RadioCardsProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function RadioCards({ options, value, onChange }: RadioCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(opt => {
        const selected = value === opt
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`p-4 rounded-xl border-2 text-left text-sm font-medium transition-all duration-150 ${
              selected
                ? 'border-black bg-black text-white'
                : 'border-border bg-card text-text hover:border-neutral-400'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
