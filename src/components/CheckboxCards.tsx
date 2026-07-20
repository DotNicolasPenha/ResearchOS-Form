interface CheckboxCardsProps {
  options: string[]
  value: string[]
  onChange: (items: string[]) => void
}

export function CheckboxCards({ options, value, onChange }: CheckboxCardsProps) {
  const toggle = (item: string) => {
    onChange(
      value.includes(item) ? value.filter(i => i !== item) : [...value, item]
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(opt => {
        const checked = value.includes(opt)
        return (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`p-4 rounded-xl border-2 text-left text-sm font-medium transition-all duration-150 ${
              checked
                ? 'border-black bg-black text-white'
                : 'border-border bg-card text-text hover:border-neutral-400'
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                  checked
                    ? 'border-white bg-white'
                    : 'border-neutral-300 bg-transparent'
                }`}
              >
                {checked && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              {opt}
            </span>
          </button>
        )
      })}
    </div>
  )
}
