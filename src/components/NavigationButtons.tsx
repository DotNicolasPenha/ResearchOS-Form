import { motion } from 'framer-motion'

interface NavigationButtonsProps {
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  showBack?: boolean
}

export function NavigationButtons({
  onBack,
  onNext,
  nextLabel = 'Próximo',
  nextDisabled = false,
  showBack = true,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-3 mt-6">
      {showBack && onBack && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="flex-1 py-4 rounded-xl border-2 border-border text-text-secondary font-semibold text-base transition-colors hover:bg-neutral-100"
        >
          Voltar
        </motion.button>
      )}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        disabled={nextDisabled}
        className={`flex-[2] py-4 rounded-xl font-semibold text-base transition-all ${
          nextDisabled
            ? 'bg-border text-text-secondary cursor-not-allowed'
            : 'bg-black text-white active:bg-neutral-800 shadow-lg shadow-black/10'
        }`}
      >
        {nextLabel}
      </motion.button>
    </div>
  )
}
