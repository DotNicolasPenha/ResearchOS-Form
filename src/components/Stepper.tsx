interface StepperProps {
  steps: string[]
  current: number
  onStepClick?: (step: number) => void
}

export function Stepper({ steps, current, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-1 py-3">
      {steps.map((label, i) => (
        <button
          key={label}
          onClick={() => onStepClick?.(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current
              ? 'bg-black w-6'
              : i < current
              ? 'bg-black/30 w-2'
              : 'bg-border w-2'
          }`}
          aria-label={label}
        />
      ))}
    </div>
  )
}
