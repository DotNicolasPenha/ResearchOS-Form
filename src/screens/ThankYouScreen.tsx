import { motion } from 'framer-motion'

export function ThankYouScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen px-8"
    >
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-8 mx-auto">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-text mb-3">Obrigado por fazer parte!</h1>

        <p className="text-text-secondary text-base leading-relaxed mb-4">
          Sua resposta contribui diretamente para o desenvolvimento de ferramentas voltadas à pesquisa científica.
        </p>

        <p className="text-text-secondary text-sm">
          Feito por <span className="font-semibold text-text">Dotvinci</span>
        </p>
      </div>
    </motion.div>
  )
}
