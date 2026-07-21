import { motion } from 'framer-motion'

interface OptionalFieldsNoticeScreenProps {
  onNext: () => void
  onBack: () => void
}

export function OptionalFieldsNoticeScreen({ onNext, onBack }: OptionalFieldsNoticeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-8"
    >
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-8 mx-auto">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-text mb-4 leading-tight">
          Obrigado por dedicar seu tempo.
        </h1>

        <p className="text-text-secondary text-base leading-relaxed mb-4">
          Este formulário possui campos <strong className="text-text">opcionais</strong> — são um agradecimento por estar aqui.
        </p>

        <p className="text-text-secondary text-base leading-relaxed mb-4">
          Responda só o que quiser. Suas respostas, mesmo incompletas, ajudam a construir ferramentas melhores para pesquisadores.
        </p>

        <p className="text-text-secondary text-sm mb-10">
          O futuro da pesquisa científica agradece.
        </p>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
            className="flex-1 py-4 rounded-xl border-2 border-border text-text-secondary font-semibold text-base transition-colors hover:bg-neutral-100"
          >
            Voltar
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="flex-[2] py-4 bg-black text-white rounded-xl font-semibold text-base active:bg-neutral-800 shadow-lg shadow-black/10"
          >
            Entendi, vamos lá
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
