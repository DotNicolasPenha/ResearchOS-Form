import { useRef, useEffect } from 'react'

interface AutoResizeTextareaProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function AutoResizeTextarea({ label, value, onChange, required }: AutoResizeTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])

  return (
    <div className="relative mb-4">
      <textarea
        ref={ref}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        rows={3}
        className="w-full px-4 pt-6 pb-2 text-base bg-card border border-border rounded-xl outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10 resize-none overflow-hidden"
      />
      <label className="absolute left-4 top-2 text-xs text-black pointer-events-none">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  )
}
