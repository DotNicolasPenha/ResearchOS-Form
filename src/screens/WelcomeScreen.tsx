import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-8"
    >
      <div className="text-center max-w-sm">
        <h1 className="text-3xl font-bold text-text mb-4 leading-tight">
          Ajude a melhorar a pesquisa científica.
        </h1>

        <p className="text-text-secondary text-base leading-relaxed mb-3">
          Estamos entendendo como pesquisadores trabalham para criar ferramentas que economizam seu tempo.
        </p>

        <p className="text-text-secondary text-sm mb-10">
          Anônimo · ~5 minutos
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full py-4 bg-black text-white rounded-2xl font-semibold text-base active:bg-neutral-800 transition-colors"
        >
          Começar
        </motion.button>
      </div>
    </motion.div>
  )
}
