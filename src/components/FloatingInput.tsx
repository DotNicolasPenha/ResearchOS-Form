import { useState } from 'react'

interface FloatingInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
}

export function FloatingInput({ label, value, onChange, type = 'text', required }: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  return (
    <div className="relative mb-4">
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-2 text-base bg-card border border-border rounded-xl outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? 'top-2 text-xs text-black'
            : 'top-4 text-base text-text-secondary'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  )
}
